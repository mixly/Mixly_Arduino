from tkinter import *
import tkinter.filedialog

def getOneFile():
	fn = tkinter.filedialog.askopenfilename()
	return fn

def getManyFiles():
	files = tkinter.filedialog.askopenfilenames()
	if files:
		ofiles = []
		for filename in files:
			ofiles.append(filename)
	return ofiles

def getDirectory():
	dr = tkinter.filedialog.askdirectory()
	return dr