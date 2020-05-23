/*
 * AT24Cxx.h - library for AT24Cxx
 */

#ifndef AT24Cxx_h
#define AT24Cxx_h

class AT24Cxx
{
  // user-accessible "public" interface
  public:
    AT24Cxx();
    AT24Cxx(uint8_t);

    static bool isPresent(void);      // check if the device is present
    static int ReadMem(int iAddr, char Buf[], int iCnt);
    static uint8_t WriteMem(int iAddr, uint8_t iVal);
    static uint8_t WriteMem(int iAddr, const char *pBuf, int iCnt);

    static int     ReadStr(int iAddr, char Buf[], int iBufLen);
    static uint8_t WriteStr(int iAddr, const char *pBuf);

  private:
};
#endif
