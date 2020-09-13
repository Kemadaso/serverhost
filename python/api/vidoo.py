from os import path
import json
import requests
import re

# comment line
"""
curl -X POST -s 'https://ec5.vidoo.tv/upload/01'  -H 'content-type: multipart/form-data' -F 'file=@/mnt/e/nodeprojects/serverhost/python/video2.mp4' -F 'api_key=795b6pbrt36m5tnkgm4'
"""

def do_upload(pathfile):
  #pathfile = path.join(path.dirname(path.abspath(__file__)), 'video2.mp4')
  if(path.isfile(pathfile) == False):
    return {"error": "file no exists"}
    

  try:
    r = requests.get(url="https://vidoo.tv/api/upload/server?key=795b6pbrt36m5tnkgm4")
    r = json.loads(r.content)
    
    try:
      f = open (pathfile,'rb')
      r = requests.post(
        url=r['result'], 
        data={'api_key':'795b6pbrt36m5tnkgm4'},
        files={'file':f}
      )
      #print (r.content)
      code = re.split('"fn">', r.content.decode("utf-8") )
      code = re.split( '</textarea>' , code[1])
      return "https://vidoo.tv/"+ code[0] +".html"

    except:
      return {"error": "ocurrio un error con los archivos"}
      
  except:
    return {"error": "ocurrio un error en la ruta de subida"}
    


