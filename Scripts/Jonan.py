#This is a python script that prints hello world in a GUI

import sys
from PyQt6.QtWidgets import QApplication , QMainWindow , QLabel , QVBoxLayout

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Hello World app")
        self.label = QLabel("Hello World")
        self.setCentralWidget(self.label)


app = QApplication([])
window = MainWindow()
window.show()
app.exec()

