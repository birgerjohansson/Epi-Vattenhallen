#!/usr/bin/env python3
import sys
from PyQt6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QHBoxLayout, QLabel, QPushButton, QTextEdit, 
                             QGroupBox, QFrame)
from PyQt6.QtCore import QTimer, Qt
from PyQt6.QtGui import QFont
import subprocess
import signal
import os
import time
from datetime import datetime

class ProcessManager(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Epi start program")
        self.setGeometry(100, 100, 500, 450)
        
        # Process handles
        self.fcserver_process = None
        self.ikaros_process = None
        self.npm_process = None
        
        # Flag för att stoppa status check
        self.running = True
        
        # Skapa GUI
        self.create_widgets()
        
        # Starta status update timer
        self.status_timer = QTimer()
        self.status_timer.timeout.connect(self.update_status)
        self.status_timer.start(500)  # Uppdatera var 500ms
    
    def create_widgets(self):
        """Skapa GUI-komponenter"""
        
        # Huvudwidget och layout
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)
        main_layout.setContentsMargins(10, 10, 10, 10)
        main_layout.setSpacing(10)
        
        # Titel
        title_label = QLabel("Processhanterare")
        title_font = QFont("Arial", 16, QFont.Weight.Bold)
        title_label.setFont(title_font)
        title_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        main_layout.addWidget(title_label)
        
        # Status GroupBox
        status_group = QGroupBox("Status")
        status_layout = QHBoxLayout()
        status_layout.setSpacing(20)
        status_group.setLayout(status_layout)
        
        # ikaros status
        ikaros_frame = QWidget()
        ikaros_layout = QVBoxLayout(ikaros_frame)
        ikaros_layout.setContentsMargins(0, 0, 0, 0)
        ikaros_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        ikaros_label = QLabel("Epi (ikaros)")
        ikaros_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        ikaros_layout.addWidget(ikaros_label)
        
        self.ikaros_led = QFrame()
        self.ikaros_led.setFixedSize(30, 30)
        self.ikaros_led.setFrameShape(QFrame.Shape.Box)
        self.ikaros_led.setStyleSheet("background-color: red; border-radius: 15px; border: 1px solid gray;")
        ikaros_layout.addWidget(self.ikaros_led, alignment=Qt.AlignmentFlag.AlignCenter)
        
        self.ikaros_status = QLabel("Stoppad")
        self.ikaros_status.setStyleSheet("color: red;")
        self.ikaros_status.setAlignment(Qt.AlignmentFlag.AlignCenter)
        ikaros_layout.addWidget(self.ikaros_status)
        
        status_layout.addWidget(ikaros_frame)
        
        # fcserver status
        fcserver_frame = QWidget()
        fcserver_layout = QVBoxLayout(fcserver_frame)
        fcserver_layout.setContentsMargins(0, 0, 0, 0)
        fcserver_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        fcserver_label = QLabel("Epi (fcserver)")
        fcserver_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        fcserver_layout.addWidget(fcserver_label)
        
        self.fcserver_led = QFrame()
        self.fcserver_led.setFixedSize(30, 30)
        self.fcserver_led.setFrameShape(QFrame.Shape.Box)
        self.fcserver_led.setStyleSheet("background-color: red; border-radius: 15px; border: 1px solid gray;")
        fcserver_layout.addWidget(self.fcserver_led, alignment=Qt.AlignmentFlag.AlignCenter)
        
        self.fcserver_status = QLabel("Stoppad")
        self.fcserver_status.setStyleSheet("color: red;")
        self.fcserver_status.setAlignment(Qt.AlignmentFlag.AlignCenter)
        fcserver_layout.addWidget(self.fcserver_status)
        
        status_layout.addWidget(fcserver_frame)
        
        # npm start status
        npm_frame = QWidget()
        npm_layout = QVBoxLayout(npm_frame)
        npm_layout.setContentsMargins(0, 0, 0, 0)
        npm_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        npm_label = QLabel("Hemsidan")
        npm_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        npm_layout.addWidget(npm_label)
        
        self.npm_led = QFrame()
        self.npm_led.setFixedSize(30, 30)
        self.npm_led.setFrameShape(QFrame.Shape.Box)
        self.npm_led.setStyleSheet("background-color: red; border-radius: 15px; border: 1px solid gray;")
        npm_layout.addWidget(self.npm_led, alignment=Qt.AlignmentFlag.AlignCenter)
        
        self.npm_status = QLabel("Stoppad")
        self.npm_status.setStyleSheet("color: red;")
        self.npm_status.setAlignment(Qt.AlignmentFlag.AlignCenter)
        npm_layout.addWidget(self.npm_status)
        
        status_layout.addWidget(npm_frame)
        
        main_layout.addWidget(status_group)
        
        # Knappar
        button_layout = QHBoxLayout()
        
        self.start_button = QPushButton("Starta/Omstart")
        self.start_button.clicked.connect(self.start_processes)
        button_layout.addWidget(self.start_button)
        
        self.stop_button = QPushButton("Avsluta")
        self.stop_button.clicked.connect(self.stop_processes)
        button_layout.addWidget(self.stop_button)
        
        main_layout.addLayout(button_layout)
        
        # Log GroupBox
        log_group = QGroupBox("Log")
        log_layout = QVBoxLayout()
        log_group.setLayout(log_layout)
        
        self.log_text = QTextEdit()
        self.log_text.setReadOnly(True)
        self.log_text.setMinimumHeight(150)
        log_layout.addWidget(self.log_text)
        
        main_layout.addWidget(log_group)
    
    def log_message(self, message):
        """Lägg till meddelande i log"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_text.append(f"[{timestamp}] {message}")
    
    def update_led(self, led_frame, is_running, color="green"):
        """Uppdatera lysdiod färg"""
        led_color = color if is_running else "red"
        led_frame.setStyleSheet(f"background-color: {led_color}; border-radius: 10px; border: 1px solid gray;")
    
    def start_processes(self):
        """Starta eller omstarta processerna"""
        self.log_message("Startar processer...")
        
        # Stoppa befintliga processer först
        self.stop_processes_internal()
        time.sleep(1)
        
        try:
            self.log_message("Startar ./fcserver...")
            self.fcserver_process = subprocess.Popen(
                ["/Users/birger/Code/fadecandy/server/fcserver"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                preexec_fn=os.setsid
            )
            self.log_message(f"✓ fcserver startad (PID: {self.fcserver_process.pid})")
        except Exception as e:
            self.log_message(f"✗ Fel vid start av fcserver: {e}")
        
        try:
            self.log_message("Startar ./ikaros...")
            self.ikaros_process = subprocess.Popen(
                [
                    "/Users/birger/Code/ikaros-2/Bin/ikaros",
                    "/Users/birger/Code/ikaros-2/Projects/2021/Vattenhallen/EpiTorso/ExperimentSetup.ikg",
                    "-t",
                    "-r25"
                    "simulateRobot=True"
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                preexec_fn=os.setsid
            )
            self.log_message(f"✓ ikaros startad (PID: {self.ikaros_process.pid})")
        except Exception as e:
            self.log_message(f"✗ Fel vid start av ikaros: {e}")
        
        try:
            self.log_message("Startar npm start...")
            self.npm_process = subprocess.Popen(
                ["npm", "start"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                cwd="/Users/birger/Code/Epi-Vattenhallen/epiguess",
                preexec_fn=os.setsid
            )
            self.log_message(f"✓ npm start startad (PID: {self.npm_process.pid})")
        except Exception as e:
            self.log_message(f"✗ Fel vid start av npm start: {e}")
    
    def stop_processes_internal(self):
        """Stoppa processer internt (med timeout)"""
        for name, process in [("fcserver", self.fcserver_process), ("ikaros", self.ikaros_process), ("npm start", self.npm_process)]:
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
        try:
            # Kontrollera ikaros
            ikaros_running = self.ikaros_process and self.ikaros_process.poll() is None
            self.update_led(self.ikaros_led, ikaros_running, "green")
            self.ikaros_status.setText("Igång" if ikaros_running else "Stoppad")
            self.ikaros_status.setStyleSheet("color: green;" if ikaros_running else "color: red;")
            
            # Kontrollera fcserver
            fcserver_running = self.fcserver_process and self.fcserver_process.poll() is None
            self.update_led(self.fcserver_led, fcserver_running, "blue")
            self.fcserver_status.setText("Igång" if fcserver_running else "Stoppad")
            self.fcserver_status.setStyleSheet("color: green;" if fcserver_running else "color: red;")
            
            # Kontrollera npm start
            npm_running = self.npm_process and self.npm_process.poll() is None
            self.update_led(self.npm_led, npm_running, "yellow")
            self.npm_status.setText("Igång" if npm_running else "Stoppad")
            self.npm_status.setStyleSheet("color: green;" if npm_running else "color: red;")
        except Exception as e:
            self.log_message(f"Fel i status update: {e}")
    
    def closeEvent(self, event):
        """Hantera fönster stängning"""
        self.log_message("Stänger programmet...")
        self.running = False
        self.status_timer.stop()
        self.stop_processes_internal()
        event.accept()

def main():
    app = QApplication(sys.argv)
    manager = ProcessManager()
    manager.show()
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
