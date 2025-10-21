#!/usr/bin/env python3
import tkinter as tk
from tkinter import ttk
import subprocess
import threading
import signal
import os
import time
from datetime import datetime

class ProcessManager:
    def __init__(self, root):
        self.root = root
        self.root.title("Process Manager")
        self.root.geometry("400x300")
        
        # Process handles
        self.fcsercer_process = None
        self.ikaros_process = None
        
        # Flag för att stoppa status check
        self.running = True
        
        # Skapa GUI
        self.create_widgets()
        
        # Starta status update thread
        self.status_thread = threading.Thread(target=self.update_status, daemon=True)
        self.status_thread.start()
        
        # Hantera fönster stängning
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
    
    def create_widgets(self):
        """Skapa GUI-komponenter"""
        
        # Titel
        title_label = ttk.Label(self.root, text="Processhanterare", font=("Arial", 16, "bold"))
        title_label.pack(pady=10)
        
        # Frame för lysdioder och status
        status_frame = ttk.LabelFrame(self.root, text="Status", padding=10)
        status_frame.pack(padx=10, pady=10, fill="both", expand=True)
        
        # ikaros lysdiod
        ikaros_frame = ttk.Frame(status_frame)
        ikaros_frame.pack(pady=10, fill="x")
        
        ttk.Label(ikaros_frame, text="ikaros:").pack(side="left", padx=5)
        self.ikaros_led = tk.Canvas(ikaros_frame, width=20, height=20, bg="white", relief="sunken", bd=1)
        self.ikaros_led.pack(side="left", padx=5)
        self.ikaros_status = ttk.Label(ikaros_frame, text="Stoppad", foreground="red")
        self.ikaros_status.pack(side="left", padx=5)
        
        # fcsercer lysdiod
        fcsercer_frame = ttk.Frame(status_frame)
        fcsercer_frame.pack(pady=10, fill="x")
        
        ttk.Label(fcsercer_frame, text="fcsercer:").pack(side="left", padx=5)
        self.fcsercer_led = tk.Canvas(fcsercer_frame, width=20, height=20, bg="white", relief="sunken", bd=1)
        self.fcsercer_led.pack(side="left", padx=5)
        self.fcsercer_status = ttk.Label(fcsercer_frame, text="Stoppad", foreground="red")
        self.fcsercer_status.pack(side="left", padx=5)
        
        # Knappar
        button_frame = ttk.Frame(self.root)
        button_frame.pack(pady=10)
        
        self.start_button = ttk.Button(button_frame, text="Starta/Omstart", command=self.start_processes)
        self.start_button.pack(side="left", padx=5)
        
        self.stop_button = ttk.Button(button_frame, text="Avsluta", command=self.stop_processes)
        self.stop_button.pack(side="left", padx=5)
        
        # Log text
        log_frame = ttk.LabelFrame(self.root, text="Log", padding=5)
        log_frame.pack(padx=10, pady=5, fill="both", expand=True)
        
        self.log_text = tk.Text(log_frame, height=6, width=50, state="disabled")
        self.log_text.pack(fill="both", expand=True)
        
        scrollbar = ttk.Scrollbar(self.log_text)
        scrollbar.pack(side="right", fill="y")
        self.log_text.config(yscrollcommand=scrollbar.set)
        scrollbar.config(command=self.log_text.yview)
    
    def log_message(self, message):
        """Lägg till meddelande i log"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_text.config(state="normal")
        self.log_text.insert("end", f"[{timestamp}] {message}\n")
        self.log_text.see("end")
        self.log_text.config(state="disabled")
    
    def update_led(self, canvas, is_running, color="green"):
        """Uppdatera lysdiod färg"""
        canvas.delete("all")
        led_color = color if is_running else "red"
        canvas.create_oval(2, 2, 18, 18, fill=led_color)
    
    def start_processes(self):
        """Starta eller omstarta processerna"""
        self.log_message("Startar processer...")
        
        # Stoppa befintliga processer först
        self.stop_processes_internal()
        time.sleep(1)
        
        try:
            self.log_message("Startar ./fcsercer...")
            self.fcsercer_process = subprocess.Popen(
                ["/Users/birger/Code/fadecandy/server/fcsercer"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                preexec_fn=os.setsid
            )
            self.log_message(f"✓ fcsercer startad (PID: {self.fcsercer_process.pid})")
        except Exception as e:
            self.log_message(f"✗ Fel vid start av fcsercer: {e}")
        
        try:
            self.log_message("Startar ./ikaros...")
            self.ikaros_process = subprocess.Popen(
                [
                    "/Users/birger/Code/ikaros-2/Bin/ikaros",
                    "/Users/birger/Code/ikaros-2/Robots/Epi/ExperimentSetup.ikg",
                    "-t",
                    "-r25",
                    "simulateRobot=True",
                    "EpiName=EpiGreen"
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                preexec_fn=os.setsid
            )
            self.log_message(f"✓ ikaros startad (PID: {self.ikaros_process.pid})")
        except Exception as e:
            self.log_message(f"✗ Fel vid start av ikaros: {e}")
    
    def stop_processes_internal(self):
        """Stoppa processer internt (med timeout)"""
        for name, process in [("fcsercer", self.fcsercer_process), ("ikaros", self.ikaros_process)]:
            if process and process.poll() is None:
                try:
                    self.log_message(f"Skickar SIGTERM till {name}...")
                    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
                    
                    # Vänta max 20 sekunder
                    start_time = time.time()
                    while time.time() - start_time < 20:
                        if process.poll() is not None:
                            self.log_message(f"✓ {name} avslutad graciöst")
                            return
                        time.sleep(0.5)
                    
                    # Om inte avslutad efter 20 sekunder, döda processen
                    self.log_message(f"Timeout! Skickar SIGKILL till {name}...")
                    os.killpg(os.getpgid(process.pid), signal.SIGKILL)
                    process.wait(timeout=2)
                    self.log_message(f"✓ {name} tvingades avsluta")
                except Exception as e:
                    self.log_message(f"✗ Fel vid stopp av {name}: {e}")
    
    def stop_processes(self):
        """Stoppa alla processer (knappkommando)"""
        self.log_message("Stoppning av processer...")
        self.stop_processes_internal()
        self.log_message("Alla processer stoppade")
    
    def update_status(self):
        """Uppdatera status på lysdioder regelbundet"""
        while self.running:
            try:
                # Kontrollera ikaros
                ikaros_running = self.ikaros_process and self.ikaros_process.poll() is None
                self.root.after(0, self.update_led, self.ikaros_led, ikaros_running, "green")
                self.root.after(0, lambda: self.ikaros_status.config(
                    text="Igång" if ikaros_running else "Stoppad",
                    foreground="green" if ikaros_running else "red"
                ))
                
                # Kontrollera fcsercer
                fcsercer_running = self.fcsercer_process and self.fcsercer_process.poll() is None
                self.root.after(0, self.update_led, self.fcsercer_led, fcsercer_running, "blue")
                self.root.after(0, lambda: self.fcsercer_status.config(
                    text="Igång" if fcsercer_running else "Stoppad",
                    foreground="green" if fcsercer_running else "red"
                ))
                
                time.sleep(0.5)
            except Exception as e:
                self.log_message(f"Fel i status update: {e}")
                time.sleep(1)
    
    def on_closing(self):
        """Hantera fönster stängning"""
        self.log_message("Stänger programmet...")
        self.running = False
        self.stop_processes_internal()
        self.root.destroy()

def main():
    root = tk.Tk()
    manager = ProcessManager(root)
    root.mainloop()

if __name__ == "__main__":
    main()
