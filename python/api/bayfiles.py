from os import path
import json
import requests
import re

# comment line


def do_upload(pathfile):
  #pathfile = path.join(path.dirname(path.abspath(__file__)), 'video2.mp4')
  if(path.isfile(pathfile) == False):
    return {"error": "file no exists"}
  
  try:
    f = open (pathfile,'rb')
    r = requests.post(
      url="https://api.bayfiles.com/upload?token=3920895f095f5e82", 
      files={'file':f}
    )
   
    #print (r.content)
    js = json.loads(r.content)

    return js['data']['file']['url']['full']

  except:
    return {"error": "ocurrio un error con los archivos"}
      
 
    


