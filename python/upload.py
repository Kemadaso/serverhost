#!/usr/bin/python

import sys, getopt
from os import path, system, listdir
from api import vidoo, bayfiles, uptobox, mystream
import re

def main(argv):
  
  servername = ''
  relativefile = '' 
  
  try:
    opts, args = getopt.getopt(argv,"h:s:f:",["server=","file="])
  except getopt.GetoptError:
    print ('upload.py -s <servername> -f <file>')
    sys.exit(2)
  for opt, arg in opts:
    if opt == '-h':
      print ('upload.py -s <servername> -f <file>')
      sys.exit()
    elif opt in ("-s", "--server"):
      servername = arg
    elif opt in ("-f", "--file"):
      relativefile = arg
  
  
  pathfile = path.dirname(path.dirname(path.abspath(__file__)))
  pathfile = path.join(pathfile, 'storage', relativefile)
  #print(listdir(pathfile))
  #print(pathfile)
 
  if(servername == 'vidoo'):
    r = vidoo.do_upload(pathfile)
    print(r)

  if(servername == 'bayfiles'):
    r = bayfiles.do_upload(pathfile)
    print(r)
  
  if(servername == 'uptobox'):
    r = uptobox.do_upload(pathfile)
    print(r)
  
  if(servername == 'mystream'):
    r = mystream.do_upload(pathfile)
    print(r)

  exit()

#/morrissey-first-of-the-gang-to-diemp4/Morrissey - First of the gang to die.mp4

if __name__ == "__main__":
  main(sys.argv[1:])