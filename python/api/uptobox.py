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
    
    r = requests.get(url="https://uptobox.com/api/upload", data={'token': '8c0190dddb263f12c2144'})
    r = json.loads(r.content)
    
    try:

      f = open (pathfile,'rb')
      r = requests.post(
        url= "https:" + r['data']['uploadLink'], 
        data={'api_key':'8c0190dddb263f12c2144'},
        files={'file':f}
      )
      #print (r.content)
      r = json.loads(r.content.decode("utf-8"))
      #print(r)
      r = r['files'][0]['url']
      
      return r

    except:
      return {"error": "ocurrio un error con los archivos"}
      
  except:
    return {"error": "ocurrio un error en la ruta de subida"}
    


