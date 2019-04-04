#include "JsonStreamingParser.h"
#include "JsonListener.h"
#include "ExampleParser.h"

JsonStreamingParser parser;
ExampleListener listener;

void setup() {
  Serial.begin(115200);
  Serial.println(String(ESP.getFreeHeap()));
  parser.setListener(&listener);
  // put your setup code here, to run once:
  char json[] = "{\"a\":3, \"b\":{\"c\":\"d\"}}";
  for (int i = 0; i < sizeof(json); i++) {
    parser.parse(json[i]); 
  }
  Serial.println(String(ESP.getFreeHeap()));
}

void loop() {
  // put your main code here, to run repeatedly:

}
