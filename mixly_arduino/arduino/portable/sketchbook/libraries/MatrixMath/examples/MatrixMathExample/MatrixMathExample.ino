#include <MatrixMath.h>


#define N  (2)

float A[N][N];
float B[N][N];
float C[N][N];
float v[N];      // This is a row vector
float w[N];

float max = 10;  // maximum random matrix entry range

void setup()
{
	Serial.begin(9600);

	// Initialize matrices
	for (int i = 0; i < N; i++)
	{
		v[i] = i + 1;                  // vector of sequential numbers
		for (int j = 0; j < N; j++)
		{
			A[i][j] = random(max) - max / 2.0f; // A is random
			if (i == j)
			{
				B[i][j] = 1.0f;                  // B is identity
			}
			else
			{
				B[i][j] = 0.0f;
			}
		}
	}

}

void loop()
{

	Matrix.Multiply((float*)A, (float*)B, N, N, N, (float*)C); //矩阵乘法

	Serial.println("\nAfter multiplying C = A*B:");
	Matrix.Print((float*)A, N, N, "A");

	Matrix.Print((float*)B, N, N, "B");
	Matrix.Print((float*)C, N, N, "C");
	Matrix.Print((float*)v, N, 1, "v");

	Matrix.Add((float*) B, (float*) C, N, N, (float*) C); //矩阵加法
	Serial.println("\nC = B+C (addition in-place)");
	Matrix.Print((float*)C, N, N, "C"); //串口打印矩阵C
	Matrix.Print((float*)B, N, N, "B"); //串口打印矩阵B

	Matrix.Copy((float*)A, N, N, (float*)B); //复制矩阵A到矩阵B
	Serial.println("\nCopied A to B:");
	Matrix.Print((float*)B, N, N, "B");  //串口打印矩阵B

	Matrix.Invert((float*)A, N); //矩阵求逆
	Serial.println("\nInverted A:");
	Matrix.Print((float*)A, N, N, "A");

	Matrix.Multiply((float*)A, (float*)B, N, N, N, (float*)C);
	Serial.println("\nC = A*B");
	Matrix.Print((float*)C, N, N, "C");

	// Because the library uses pointers and DIY indexing,
	// a 1D vector can be smoothly handled as either a row or col vector
	// depending on the dimensions we specify when calling a function
	Matrix.Multiply((float*)C, (float*)v, N, N, 1, (float*)w);
	Serial.println("\n C*v = w:");
	Matrix.Print((float*)v, N, 1, "v");
	Matrix.Print((float*)w, N, 1, "w");

	while(1);
}
