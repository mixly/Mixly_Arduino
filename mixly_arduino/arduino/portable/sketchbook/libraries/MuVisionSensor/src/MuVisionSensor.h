// Copyright 2018 Morpx Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#ifndef MUVISIONSENSOR_SRC_MUVISIONSENSOR_H_
#define MUVISIONSENSOR_SRC_MUVISIONSENSOR_H_

#include "mu_vision_sensor_interface.h"
#include "mu_vision_sensor_uart_hw_interface.h"
#include "mu_vision_sensor_i2c_hw_interface.h"

/*
 * MuVisionType
 * Bit: |          3         |          2         |            1             |           0         |
 *      | VISION_LINE_DETECT | VISION_BALL_DETECT | VISION_COLOR_RECOGNITION | VISION_COLOR_DETECT |
 *      |           7            |             6              |             5            |          4         |
 *      | VISION_NUM_CARD_DETECT | VISION_TRAFFIC_CARD_DETECT | VISION_SHAPE_CARD_DETECT | VISION_BODY_DETECT |
 */
typedef unsigned short MuVisionType;

// MuVisionType: Vision Type User Input
#define VISION_COLOR_DETECT           (MuVisionType)visionTypeEnumToMacro(kVisionColorDetect)
#define VISION_COLOR_RECOGNITION      (MuVisionType)visionTypeEnumToMacro(kVisionColorRecog)
#define VISION_BALL_DETECT            (MuVisionType)visionTypeEnumToMacro(kVisionBall)
#define VISION_BODY_DETECT            (MuVisionType)visionTypeEnumToMacro(kVisionBody)
#define VISION_SHAPE_CARD_DETECT      (MuVisionType)visionTypeEnumToMacro(kVisionShapeCard)
#define VISION_TRAFFIC_CARD_DETECT    (MuVisionType)visionTypeEnumToMacro(kVisionTrafficCard)
#define VISION_NUM_CARD_DETECT        (MuVisionType)visionTypeEnumToMacro(kVisionNumberCard)
#define VISION_ALL                    (MuVisionType)(visionTypeEnumToMacro(kVisionMaxType)-1)

// Card Type
// Vision Shape Card
#define MU_SHAPE_CARD_TICK            0x01U
#define MU_SHAPE_CARD_CROSS           0x02U
#define MU_SHAPE_CARD_CIRCLE          0x03U
#define MU_SHAPE_CARD_SQUARE          0x04U
#define MU_SHAPE_CARD_TRIANGLE        0x05U
// Vision Traffic Card
#define MU_TRAFFIC_CARD_FORWARD       0x01U
#define MU_TRAFFIC_CARD_LEFT          0x02U
#define MU_TRAFFIC_CARD_RIGHT         0x03U
#define MU_TRAFFIC_CARD_TURN_AROUND   0x04U
#define MU_TRAFFIC_CARD_PARK          0x05U
// Vision Color Type
#define MU_COLOR_UNKNOWN              0x00U
#define MU_COLOR_BLACK                0x01U
#define MU_COLOR_WHITE                0x02U
#define MU_COLOR_RED                  0x03U
#define MU_COLOR_YELLOW               0x04U
#define MU_COLOR_GREEN                0x05U
#define MU_COLOR_CYAN                 0x06U
#define MU_COLOR_BLUE                 0x07U
#define MU_COLOR_PURPLE               0x08U
// Vision Ball Type
#define MU_BALL_TABLE_TENNIS          0x01U
#define MU_BALL_TENNIS                0x02U


class MuVisionSensor {
 public:
  /**
    * @brief  construct class MU vision sensor.
    * @param  address: MU vision sensor device address.
    * @retval none
    */
  MuVisionSensor(uint32_t address = 0x60);
  virtual ~MuVisionSensor();

  /**
    * @ TODO WARNING this function may delete in later version, please use `begin(communication_port)` instead.
    * @brief  MU vision sensor begin.
    * @param  communication_port: MuVsI2C(i2c) or MuVsUart(uart).
    * @param  mode: kSerialMode
    *               kI2CMode
    * @retval MU_OK: begin success.
    *         other: protocol assert fail.
    */
  uint8_t __attribute__ ((deprecated("\n***WARNING*** function `begin(communication_port, mode)` has been deprecated, and may delete in later version, please use `begin(communication_port)` instead.")))
          begin(void* communication_port,
                MuVsMode mode);
  /**
    * @brief  MU vision sensor begin.
    * @param  communication_port: MuVsUart(uart).
    * @retval MU_OK: begin success.
    *         other: protocol assert fail.
    */
  uint8_t begin(MuVsUart* communication_port);
  /**
    * @brief  MU vision sensor begin.
    * @param  communication_port: MuVsI2C(i2c).
    * @retval MU_OK: begin success.
    *         other: protocol assert fail.
    */
  uint8_t begin(MuVsI2C* communication_port);

  // Based interface
  /**
    * @brief  begin vision.
    * @param  vision_type: vision type.
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t VisionBegin(MuVisionType);
  /**
    * @brief  end vision.
    * @param  vision_type: vision type.
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t VisionEnd(MuVisionType);
  /**
    * @brief  get vision result data, this function will update vision
    *         result automatically.
    * @param  vision_type: vision type.
    * @param  object_inf:  object information
    * @retval information value
    */
  int GetValue(MuVisionType vision_type,
               MuVsObjectInf object_inf);
  /**
    * @brief  write vision parameter.
    * @param  vision_type: vision type.
    * @param  object_inf:  object information
    * @param  value:  value
    * @retval MU_OK:  success
    *         other:  error
    */
  int SetValue(MuVisionType vision_type,
               MuVsObjectInf object_inf,
               uint8_t value) {
    return write(vision_type, object_inf, value);
  }
  /**
    * @brief  get vision result buffer pointer.
    *         this function WILL NOT update vision result, please use
    *         function `UpdateResult([vision_type])` or
    *         `GetValue([vision_type], kStatus)` to update vision result before this function
    * @param  vision_type: vision type.
    * @retval vision result buffer pointer,
    *         return `nullptr` if the vision type is not `begin` or not supported
    */
  MuVsVisionState* GetVisionState(MuVisionType vision_type);

  // Advance interface
  /**
    * @brief  update result data from vision sensor, must used after
    *         VisionBegin or VisionSetStatus.
    * @param  vision_type: vision type.
    * @param  wait_all_result:  true: return if get all input vision type
    *                           false: return if get one of the input vision type
    * @retval the vision type which have been updated
    */
  MuVisionType UpdateResult(MuVisionType vision_type,
                            bool wait_all_result = true);
  /**
    * @brief  write vision parameter.
    * @param  vision_type: vision type.
    * @param  object_inf:  object information
    * @param  value:  value
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t write(MuVisionType, MuVsObjectInf, uint8_t value);
  /**
    * @brief  read result data.
    * @param  vision_type: vision type.
    * @param  object_inf:  object information
    * @retval information value
    */
  uint8_t read(MuVisionType vision_type,
               MuVsObjectInf object_inf,
               uint8_t result_num = 1);

  // Sensor functions
  // @brief  restart MU vision sensor
  uint8_t SensorSetRestart(void);
  // @brief  set all register to default value(include baud rate)
  uint8_t SensorSetDefault(void);

  // LED functions
  /**
    * @brief  set led.
    * @param  led: led type.
    * @param  manual: vision type.
    * @param  hold:  object information
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t LedSetMode(MuVsLed led, bool manual, bool hold);
  /**
    * @brief  set led color.
    * @param  led: led type.
    * @param  detected_color: led color while sensor detected target.
    * @param  undetected_color: led color while sensor undetected target.
    * @param  level:  led brightness, form 0(close) to 15
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t LedSetColor(MuVsLed led,
                      MuVsLedColor detected_color,
                      MuVsLedColor undetected_color,
                      uint8_t level = 1);

  // Camera functions
  /**
    * @brief  set camera zoom.
    * @param  camera zoom value.
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t CameraSetZoom(MuVsCameraZoom);
  /**
    * @brief  rotate camera.
    * @param  enable: true: rotate camera.
    *                 false: default
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t CameraSetRotate(bool enable);
  /**
    * @brief  set camera zoom.
    * @param  camera FPS type.
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t CameraSetFPS(MuVsCameraFPS);
  /**
    * @brief  set camera white balance.
    * @param  camera white balance type.
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t CameraSetAwb(MuVsCameraWhiteBalance);
  /**
    * @brief  get camera zoom value.
    * @retval camera zoom value
    */
  MuVsCameraZoom CameraGetZoom(void);
  /**
    * @brief  get camera AWB type.
    * @retval camera AWB type
    */
  MuVsCameraWhiteBalance CameraGetAwb(void);
  /**
    * @brief  get camera rotate state.
    * @retval camera rotate state
    */
  bool CameraGetRotate(void);
  /**
    * @brief  get camera FPS type.
    * @retval camera FPS type
    */
  MuVsCameraFPS CameraGetFPS(void);

  // Uart functions
  /**
    * @brief  set UART baud rate.
    * @param  UART baud rate.
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t UartSetBaudrate(MuVsBaudrate);

  // Vision functions
  /**
    * @brief  set vision status.
    * @param  vision_type: vision type
    * @param  enable: true: enable vision
    *                 false: disable vision
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t VisionSetStatus(MuVisionType vision_type, bool enable);
  /**
    * @brief  set vision status.
    * @param  vision_type: vision type
    * @param  mode: output mode
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t VisionSetOutputMode(MuVsStreamOutputMode mode);
  /**
    * @brief  output enable.
    * @param  vision_type: vision type
    * @param  status: true: start output
    *                 false: stop output
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t VisionSetOutputEnable(MuVisionType vision_type, bool status);
  /**
    * @brief  set vision configure to default value.
    * @param  vision_type: vision type
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t VisionSetDefault(MuVisionType vision_type);
  /**
    * @brief  set vision level.
    * @param  vision_type: vision type
    * @param  level: vision level
    * @retval MU_OK:  success
    *         other:  error
    */
  uint8_t VisionSetLevel(MuVisionType vision_type,
                         MuVsVisionLevel level);
  /**
    * @brief  get vision status.
    * @retval vision status
    */
  bool VisionGetStatus(MuVisionType vision_type);
  /**
    * @brief  get vision level.
    * @retval vision level
    */
  MuVsVisionLevel VisionGetLevel(MuVisionType vision_type);
  /**
    * @brief  get vision output mode.
    * @retval vision output mode
    */
  MuVsStreamOutputMode VisionGetOutputMode(void);


  MuVisionSensor(const MuVisionSensor&) = delete;
  MuVisionSensor& operator=(const MuVisionSensor &) = delete;

 private:
  uint8_t SensorLockReg(bool lock);
  MuVisionType UartUpdateResult(MuVisionType vision_type, bool wait_all_result);
  bool malloc_vision_buffer(MuVsMessageVisionType);
  bool free_vision_buffer(MuVsMessageVisionType);

  uint8_t address_ = 0;
  MuVsMode mode_ = kSerialMode;
  MuVsMethod* mu_vs_method = nullptr;
  MuVsStreamOutputMode output_mode_ = kCallBackMode;
  MuVsVisionState *vision_state_[kVisionMaxType-1] = {nullptr};
};


#endif /* ARDUINO_LIB_MUVISIONSENSOR_SRC_MUVISIONSENSOR_H_ */
