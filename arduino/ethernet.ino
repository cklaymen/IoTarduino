#include <SPI.h>
#include <Ethernet.h>
#include <EEPROM.h>

// MAC address:
byte mac[] = {0x90, 0xA2, 0xDA, 0x0D, 0x48, 0xD3 };

// IP address:
IPAddress ip(192,168,1,20);
IPAddress gateway(192,168,1,1);
IPAddress subnet(255, 255, 255, 0);

// Port:
EthernetServer server(8081);
String readString;

// Use pins:
int pins[] = {9,8,7,6,5,4,3,2};
const int noOfPins = sizeof(pins) / sizeof(pins[0]);
boolean pinsState[noOfPins];

void setup()
{
  // Initialize pins:
  for (int i=0; i<noOfPins; i++) {
    pinsState[i] = EEPROM.read(i);
    pinMode(pins[i], OUTPUT); //pin selected to control
    
    if (pinsState[i]) {
      digitalWrite(pins[i], HIGH);
    } else {
      digitalWrite(pins[i], LOW);
    }
  }
  
  // Serial:
//  Serial.begin(9600);
  
  // Ethernet
//  Ethernet.begin(mac);
  Ethernet.begin(mac, ip, gateway, subnet);
  server.begin();
//  Serial.print("Server is at ");
//  Serial.println(Ethernet.localIP());
//  Serial.println("IoT prototype");
}

void loop()
{
  // listen for incoming clients
  EthernetClient client = server.available();
  if (client)

  {
//    Serial.println("new client");

    while (client.connected())
    {
      if (client.available())

      {
        char c = client.read();

        //read char by char HTTP request
        if (readString.length() < 100)

        {

          //store characters to string
          readString += c;
          //Serial.print(c);


//          Serial.write(c);
          // if you've gotten to the end of the line (received a newline
          // character) and the line is blank, the http request has ended,
          // so you can send a reply
          //if HTTP request has ended

          if (c == '\n') {
//            Serial.println(readString); //print to serial monitor for debuging
//--------------------------------------------------------------------------------------------------------
// Needed to Display Site:
client.println("HTTP/1.1 200 OK"); //send new page
client.println("Access-Control-Allow-Origin: *");
            client.println("Content-Type: application/json");
            client.println();

            int apiIndex = readString.indexOf("/api/");
            String json = "{}";
            int chosenPinIndex = -1;
            if(apiIndex > 0) {
              if (readString.indexOf("/api/on/") == apiIndex) {
                chosenPinIndex = 9 - (readString[apiIndex+8] - 48);
                if (chosenPinIndex >= 0 && chosenPinIndex < noOfPins) {
                  digitalWrite(pins[chosenPinIndex], HIGH);
                  pinsState[chosenPinIndex] = true;
                  EEPROM.write(chosenPinIndex, true);
                  json = "{\"state\":\"done\"}";
                } else {
                  json = "{\"state\":\"error\", \"value\":\"chosen pin is not available\"}"; 
                }
              } else if (readString.indexOf("/api/off/") == apiIndex) {
                chosenPinIndex = 9 - (readString[apiIndex+9] - 48);
                if (chosenPinIndex >= 0 && chosenPinIndex < noOfPins) {
                  digitalWrite(pins[chosenPinIndex], LOW);
                  pinsState[chosenPinIndex] = false;
                  EEPROM.write(chosenPinIndex, false);
                  json = "{\"state\":\"done\"}";
                } else {
                  json = "{\"state\":\"error\", \"value\":\"chosen pin is not available\"}"; 
                }
              } else if (readString.indexOf("/api/fetchAll/") == apiIndex) {
                json = "{\"state\": \"done\",";
                json += "\"value\":";
                json += "[";
                for (int i=0; i<noOfPins; i++) {
                  json += "{\"pin\":" + String(pins[i]) + ", \"value\":" + String(pinsState[i]) + "}";
                  if (i!=noOfPins-1) {
                    json+=",";
                  }
                }
                json += "]}";
              }
            }
            
            client.println(json);

            delay(1);
            //stopping client
            client.stop();

            //clearing string for next read
            readString="";

//            Serial.println("client disonnected");

          }
        }
      }
    }
  }
}
