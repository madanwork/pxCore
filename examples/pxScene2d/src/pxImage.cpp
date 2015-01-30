// pxCore CopyRight 2007-2015 John Robinson
// pxImage.cpp

#include "rtString.h"
#include "rtRefT.h"
#include "pxCore.h"
#include "pxOffscreen.h"
#include "pxUtil.h"
#include "pxScene2d.h"

#include "pxImage.h"

#include "pxContext.h"

#include "pxImageDownloader.h"

extern pxContext context;

rtError pxImage::url(rtString& s) const { s = mURL; return RT_OK; }
rtError pxImage::setURL(const char* s) 
{ 
  mURL = s;
  //todo - make case insensitive
  const char *result = strstr(s, "http");
  int position = result - s;
  if (position == 0 && strlen(s) > 0)
  {
    pxImageDownloadRequest downloadRequest(s);
    //todo - use addToDownloadQueue and thread pool.  this currently downloads in the main thread.
    // moving to addToDownloadQueue() will download the image on a background thread
    pxImageDownloader::getInstance()->downloadImage(&downloadRequest);
    if (downloadRequest.getDownloadStatusCode() == 0)
    {
      if (pxLoadImage(downloadRequest.getDownloadedData(),
                      downloadRequest.getDownloadedDataSize(), mOffscreen) != RT_OK)
      {
        rtLogWarn("image load failed"); // TODO: why?
      }
      else
      {
        rtLogDebug("image %d, %d", mOffscreen.width(), mOffscreen.height());
      }
    }
    else
    {
        rtLogWarn("image download failed"); // TODO: why? what happened?

    }
  }
  else 
  {
    if (pxLoadImage(s, mOffscreen) != RT_OK)
      rtLogWarn("image load failed"); // TODO: why?
    else
      rtLogDebug("image %d, %d", mOffscreen.width(), mOffscreen.height());
  }

  mw = mOffscreen.width();
  mh = mOffscreen.height();
  return RT_OK;
}

void pxImage::draw() {
  context.drawImage(mw, mh, mOffscreen, mXStretch, mYStretch);
}

rtDefineObject(pxImage, pxObject);
rtDefineProperty(pxImage, url);
rtDefineProperty(pxImage, xStretch);
rtDefineProperty(pxImage, yStretch);

