from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.firefox.options import Options

from selenium.webdriver import FirefoxOptions


import time
import os

pathvideo = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'video.mp4')


options = FirefoxOptions()
options.headless = True

driver = webdriver.Firefox(options=options)
driver.get("https://jawcloud.co/login.html")

login = driver.find_element_by_name("login")
login.clear()
login.send_keys('maloso123')

password = driver.find_element_by_name("password")
password.clear()
password.send_keys('3653328')

driver.find_element_by_css_selector('input[type="submit"]').click()


time.sleep(1)
wait = WebDriverWait(driver, 500)
element = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@href='https://jawcloud.co/?op=upload']")))
element.click()


#upload file
time.sleep(1)

print(pathvideo)

file = driver.find_element_by_id("filepc")
file.send_keys(pathvideo)

element = wait.until(EC.element_to_be_clickable((By.XPATH, "//form[@name='file']")))
element.submit()

element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".tabbertab textarea")))



print(element.get_attribute('value'))



"""
 export GECKO_DRIVER_VERSION='v0.24.0'
  wget https://github.com/mozilla/geckodriver/releases/download/$GECKO_DRIVER_VERSION/geckodriver-$GECKO_DRIVER_VERSION-linux64.tar.gz
  tar -xvzf geckodriver-$GECKO_DRIVER_VERSION-linux64.tar.gz
  rm geckodriver-$GECKO_DRIVER_VERSION-linux64.tar.gz
  chmod +x geckodriver
  cp geckodriver /usr/local/bin/
  
"""















