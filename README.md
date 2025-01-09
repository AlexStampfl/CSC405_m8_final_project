# CSUGlobal's CSC405 Graphics's Final Project

## Overview
This project implements a simple WebGL program that demonstrates the hidden surface problem and utilizes the `Painter's Algorithm`.

## Features
1. **Date & Time Display**
   - Selecting this option shows the current date and time in a text field in the format `yyyy/MM/dd HH:mm:ss`.
   
2. **Export Text**
   - The content of the text field is saved to a file named `log.txt`. The file is created or overwritten in the current directory.

3. **Change Background Color**
   - Selecting this option changes the background color of the interface to a random hue of green.

4. **Exit**
   - Closes the application.

## How It Works
The application starts by initializing the setup code and the render code. Next, the triangles are drawn from the back to the front, and the front triangle overlaps and covers the two triangles in the back.

## Running the Application
1. Compile the JavaFX application using your favorite IDE or command line.
2. Launch the application, and interact with the menu options.

## Requirements
- JavaFX SDK
- Java Development Kit (JDK)

Enjoy your new JavaFX user interface!![image](https://github.com/user-attachments/assets/b6edd719-f8c8-4cd2-a46c-b38ec9fe0fa9)
