/*
		Benchmark program to test speed of IO.
		Intended only for testing and optimization in real world scenarios, not for synthetic testing or comparison.

		Created for personal use, use it at your own risk and benefit.
		https://github.com/GitMoDu/Fast

modified 5 Aug 2017
by MoDu
*/

#include <Fast.h>
#include <DirectIO.h>

#define BENCHMARK_SIZE 100000
#define BENCHMARK_STEP_DELAY 300
#define BENCHMARK_PIN 9

FastOut ledPin;
FastOut *ledPinPointer;
FastOutCached *ledPinCachedPointer;
OutputPin DirectPin(BENCHMARK_PIN);
OutputPin *DirectPinPointer;


void setup() {
	Serial.begin(115200);

	Benchmark();
}

void Benchmark()
{
	Serial.print(F("Benchmarking "));
	Serial.print(BENCHMARK_SIZE);
	Serial.println(F(" toggles "));

	uint32_t Start, Duration;
	bool ManualToggle = false;

	pinMode(BENCHMARK_PIN, OUTPUT);
	ManualToggle = LOW;
	digitalWrite(BENCHMARK_PIN, ManualToggle);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		digitalWrite(BENCHMARK_PIN, ManualToggle);
		ManualToggle = !ManualToggle;
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	digitalWrite(BENCHMARK_PIN, ManualToggle);
	PrintBenchmarkResults(Duration, "Digital Write Manual Toggle");


	ledPin.Setup(BENCHMARK_PIN, ManualToggle);

	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		//ledPin = ManualToggle;
		ledPin.Set(ManualToggle);
		ManualToggle = !ManualToggle;
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	ledPin = ManualToggle;
	PrintBenchmarkResults(Duration, "Fast Manual Toggle");

	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		ledPin.Toggle();
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	ledPin = ManualToggle;
	PrintBenchmarkResults(Duration, "Fast Auto Toggle");


	ledPinPointer = new FastOut(BENCHMARK_PIN, ManualToggle);

	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		ledPinPointer->Set(ManualToggle);
		ManualToggle = !ManualToggle;
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	ledPinPointer->Set(ManualToggle);
	PrintBenchmarkResults(Duration, "Fast Pointer Manual Toggle");

	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		ledPinPointer->Toggle();
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	ledPinPointer->Set(ManualToggle);
	PrintBenchmarkResults(Duration, "Fast Pointer Auto Toggle");

	ledPinCachedPointer = new FastOutCached(BENCHMARK_PIN, ManualToggle);
	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		ledPinCachedPointer->Set(ManualToggle);
		ManualToggle = !ManualToggle;
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	ledPinCachedPointer->Set(ManualToggle);
	PrintBenchmarkResults(Duration, "Fast Cached Pointer Manual Toggle");

	//ledPinCachedPointer = new FastOutCached(BENCHMARK_PIN, ManualToggle);
	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		ledPinCachedPointer->Toggle();
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	ledPinCachedPointer->Set(ManualToggle);
	PrintBenchmarkResults(Duration, "Fast Cached Pointer Auto Toggle");

	DirectPin = ManualToggle;
	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{

		DirectPin = ManualToggle;
		ManualToggle = !ManualToggle;
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	DirectPin = ManualToggle;
	PrintBenchmarkResults(Duration, "DirectIO Manual Toggle");

	DirectPin = ManualToggle;
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		DirectPin.toggle();
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	DirectPin = ManualToggle;
	PrintBenchmarkResults(Duration, "DirectIO Auto Toggle");

	DirectPinPointer = new OutputPin(BENCHMARK_PIN);
	DirectPinPointer->write(ManualToggle);
	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{

		DirectPinPointer->write(ManualToggle);
		ManualToggle = !ManualToggle;
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	DirectPinPointer->write(ManualToggle);
	PrintBenchmarkResults(Duration, "DirectIO Pointer Manual Toggle");

	DirectPinPointer = new OutputPin(BENCHMARK_PIN);
	DirectPinPointer->write(ManualToggle);
	delay(BENCHMARK_STEP_DELAY);
	Start = millis();
	for (uint32_t counter = 0; counter < BENCHMARK_SIZE; counter++)
	{
		DirectPin.toggle();
	}
	Duration = millis() - Start;
	ManualToggle = LOW;
	DirectPinPointer->write(ManualToggle);
	PrintBenchmarkResults(Duration, "DirectIO Pointer Auto Toggle");


	digitalWrite(BENCHMARK_PIN, HIGH);
	Serial.println(F("Benchmark complete."));
	delay(BENCHMARK_STEP_DELAY * 3);
	digitalWrite(BENCHMARK_PIN, LOW);

}

void PrintBenchmarkResults(uint32_t duration, char* benchmarkType)
{
	Serial.print(benchmarkType);
	Serial.print(F(" took "));
	Serial.print(duration);
	Serial.print(F(" ms - "));

	double FrequencyKHz = ((double)BENCHMARK_SIZE) / ((double)duration);
	Serial.print(FrequencyKHz,1);
	Serial.println(F(" kHz"));
}

void loop() {
}
