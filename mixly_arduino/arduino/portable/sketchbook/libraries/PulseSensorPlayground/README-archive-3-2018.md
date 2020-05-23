
![logo](https://avatars0.githubusercontent.com/u/7002937?v=3&s=200)
# [PulseSensor.com](https://pulsesensor.com) Playground
```
This Playground is a collection of code for the most popular uses of PulseSensor and Arduino.  

- The playgroud includes a number of projects, with the code already written-out and commented! 🤘 
- Use this code to get started quickly, or do advanced stuff. 👍
- Switch between projects right in the Arduino IDE (software). 💻
- Contritube your projects code back to the GitHub hive-mind. 🐝
```

---
## Install the PulseSensor Playground Library !
 <details><summary><code>How To Install:  </code> 🤓</summary>

An Arduino Library is a collection of code and examples on a specific topic or device.  For example, our PulseSensor Playground Library is a collection of code and projects made just for your PulseSensor and Arduino.

(**NOTE** If you do not have Arduino, you can download it [here](https://www.arduino.cc/en/Main/Software))

To install the PulseSensor Playground Library, in Arduino, to go
`Sketch > Include Library > Manage Library...`

<img src="https://github.com/yury-g/MyCodePlayground/blob/master/images/ManageLibraries.png" width="550">


In the Library Manager: Search for and Select
`"PulseSensor.com`

<img src="https://github.com/yury-g/MyCodePlayground/blob/master/images/SearchForPulseSensor.png" width="550">


Install or update to the lastest version.👍

<img src="https://github.com/yury-g/MyCodePlayground/blob/master/images/InstallLatestVersion.png" width="550">


Hurray!  Once this library is installed you will see our examples in Arduino's dropdown!
To select an example project, go to:
`File > Examples > PulseSensor Playground > GettingStartedProject`
<img src="https://github.com/yury-g/MyCodePlayground/blob/master/images/ExamplesPlaygroundGettingStartedMenuPullDown.png" width="550">





More Info On Libraries in General 👉    [https://www.arduino.cc/en/Guide/Libraries](https://www.arduino.cc/en/Guide/Libraries).


</div>
</details>

---
## Playground Project Descriptions:


### Getting Started Project:  
  Plug your sensor in for the first time!  Blink an LED with your pulse, live.

- [**Project Page**](https://pulsesensor.com/pages/code-and-guide)

  <img src="https://cdn.shopify.com/s/files/1/0100/6632/files/PulseSensor_GettingStarted_bb_1024x1024.png?v=1511986616" width="400">
---

### Calculate BPM:  
  Focus-in on the code that calculates a user's HeartRate Beats Per Minute, "BPM".    
  See the best practises to get the best signal.  

- [**Project Page**](https://pulsesensor.com/pages/getting-advanced)

  <img src="https://cdn.shopify.com/s/files/1/0100/6632/files/PulseSensor_GettingAdvanced_bb_1024x1024.png?v=1511986194" width="400">
---

### Make A Sound to a live Heartbeat:  
  Transform the heartbeat into a live "beep" with a speaker.  

- [**Project Page**](https://pulsesensor.com/pages/pulse-sensor-speaker-tutorial)

  <img src="https://cdn.shopify.com/s/files/1/0100/6632/files/PulseSensor_Speaker_bb_61a0333f-e868-4123-961d-7456a31fa928_1024x1024.png?v=1510863829" width="400">
---  

### Move a Motor to a live Heartbeat:  
  Make a servo motor pulse to your live heartbeat.  

- [**Project Page**](https://pulsesensor.com/pages/pulse-sensor-servo-tutorial)

  <img src="https://cdn.shopify.com/s/files/1/0100/6632/files/PulseSensor_Servo_bb_87fce9fc-dc47-4208-b708-a7edb6df58a2_1024x1024.png?v=1510863990" width="400">
 ---

### Connect Two (or more) Pulse Sensors:  
  Use 2 or more Pulse Sensors on one Arduino.  

- [**Project Page**](https://pulsesensor.com/pages/two-or-more-pulse-sensors)

  <img src="https://cdn.shopify.com/s/files/1/0100/6632/files/2_PulseSensors_bb_grande.png?v=1516733684" width="400">
 ---

### Processing Visualizer:

  Get detailed visualization of the heart's pulse and behavior. Send the PulseSensor data into Processing!

- [**Project Page**](https://pulsesensor.com/pages/getting-advanced)

  <img src="https://cdn.shopify.com/s/files/1/0100/6632/files/ScreenShot_1024x1024.png?v=1491857113" width="400">

---

### Pulse Transit Time:

  Use two Pulse Sensors on different parts of your body to measure Pulse Transit Time!

- [**Project Page**](https://pulsesensor.com/pages/pulse-transit-time)

  <img src="https://cdn.shopify.com/s/files/1/0100/6632/files/PulseSensor_PTT-17042_grande.jpg?v=1517336059" width="400">

---

## Connecting the Harware 😎
1. Prepare the sensor, with the Kit parts.

<img src="https://cdn.shopify.com/s/files/1/0100/6632/products/PulseSensorKit-Labeled-Contents_1_2048x2048.jpg?v=1348506345" width="400">

2. See the recommended wiring for your specific project

<img src="https://github.com/WorldFamousElectronics/PulseSensorStarterProject/raw/master/connections.png" width="400">

<img src="https://github.com/WorldFamousElectronics/PulseSensorStarterProject/raw/master/Arduino-LEDonPin13-PulseSensor-Pic.jpg" width="400">

---

## The Functions Guide

We put together a [HANDY GUIDE](https://github.com/biomurph/PulseSensorPlayground/blob/master/resources/PulseSenaor%20Playground%20Tools.md) to the function-ality of our library. Check it out if you want to dive into the inner workings!

---

## Troubleshooting Your Signal:

 <details><summary><code> Ugh, Where's the Beat ? </code>😵</summary>
  If you're having trouble seeing a heartbeat, make sure that you are using 'Goldilocks' pressure on the Pulse Sensor: Not too hard, not too soft. Squeezing the Pulse Sensor too hard against your skin will make the heartbeat go away, and not enough pressure will cause too much noise to creep in!

If you are seeing way too many Beats Per Minute, or you are getting lots of noise, try adjusting the Threshold setting. The Threshold variable tells Arduino when to find a pulse that is legit. Adjust this number (noted below with arrows) up for less sensitivity and down for more sensitivity. In the [**StarterProject**](https://pulsesensor.com/pages/code-and-guide) you can find the Threshold variable as shown in the pic below:

  ![StarterThreshold](https://github.com/biomurph/PulseSensorPlayground/blob/master/Images/screenshot-threshold-arrows.png)

In the other examples, the `THRESHOLD` is defined at the top of the code.

</div>
   </details>

---

## Give and Get Feedback
The [Issues Tab](https://github.com/WorldFamousElectronics/PulseSensorStarterProject/issues) will get you the quickest answers to common techinal questions.


---

#### Legal:  PulseSensor.com® World Famous Electronics llc. in Brooklyn, NY. USA
