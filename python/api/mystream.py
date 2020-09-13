from os import path
import json
import requests
import re

# comment line


#access_token 9iicr2gxdsg92by3rlmpnr7blvdcbci1

def do_upload(pathfile):
  #pathfile = path.join(path.dirname(path.abspath(__file__)), 'video2.mp4')
  if(path.isfile(pathfile) == False):
    return {"error": "file no exists"}
    

  try:
    f = open (pathfile,'rb')
    r = requests.post(
      url="https://api.mystream.to/v1/remote-upload", 
      files={'path':f},
      headers={'Authorization': '9iicr2gxdsg92by3rlmpnr7blvdcbci1'}
    )
    
    return r.content.decode("utf-8")

  except:
    return {"error": "ocurrio un error con los archivos"}
      
  

"""
curl -X POST -s 'https://api.mystream.to/v1/remote-upload'  -H 'Authorization: 9iicr2gxdsg92by3rlmpnr7blvdcbci1' -d 'url=simple.mp4&path=@/mnt/e/nodeprojects/serverhost/python/video2.mp4'

"""


