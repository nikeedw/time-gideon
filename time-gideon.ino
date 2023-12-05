#include <WiFi.h>
#include "time.h"
#include "sntp.h"
#include <LiquidCrystal_I2C.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>

//address 0x27
LiquidCrystal_I2C lcd(0x27, 16, 2);   //LCD Object

const char* ssid = "Nikolaev";
const char* password = "12345678";

const char* ntpServer1 = "pool.ntp.org";
const char* ntpServer2 = "time.nist.gov";
const long  gmtOffset_sec = 3600;
const int   daylightOffset_sec = 3600;

AsyncWebServer server(80);

void printLocalTime()
{
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("No time available (yet)");
    return;
  }

  // Добавление 1 часа к времени
  timeinfo.tm_hour = (timeinfo.tm_hour + 1) % 24;

  //Display Date & Time
  lcd.clear();
  lcd.print(&timeinfo, "%B %d %Y");    //November 22 2022
  lcd.setCursor(0,1);
  lcd.print(&timeinfo, "%A,%H:%M:%S"); //Tuesday 10:30:05
}

// Callback function (NTP)
void timeavailable(struct timeval *t)
{
  Serial.println("Got time adjustment from NTP!");
  printLocalTime();
}

void setup()
{
  Serial.begin(115200);

    // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Print ESP32 IP address to serial
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Initialize SPIFFS
  if (!SPIFFS.begin()) {
      Serial.println("Failed to mount file system");
      return;
  }

  // Server static files
  server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");

  // Start server
  server.begin();

  // Setup LCD with backlight and initialize
  lcd.init();
  lcd.backlight();

  // set notification call-back function
  sntp_set_time_sync_notification_cb( timeavailable );
  sntp_servermode_dhcp(1);    // (optional)
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer1, ntpServer2);

  //connect to WiFi
  Serial.printf("Connecting to %s ", ssid);
  lcd.clear();
  lcd.print("Connecting to ");
  lcd.setCursor(0, 1);
  lcd.print(ssid);
  delay(1000);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.println(" CONNECTED");
  lcd.clear();
  lcd.print("CONNECTED");
  delay(2000);
}

void loop()
{
  delay(1000);
  printLocalTime(); 
}
