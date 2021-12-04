from logging import error
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
import time

# Login credentials
username = "admin"
password = "admin"

# initialize the Chrome driver
#driver = webdriver.Chrome("/Users/yashvimehta/Downloads/chromedriver")
driver = webdriver.Chrome("./chromedriver")

# Page URL
driver.get("http://127.0.0.1:8000/login")

driver.find_element_by_id("username").send_keys(username)
driver.find_element_by_id("password").send_keys(password)
driver.find_element_by_id("submit").click()
driver.find_element_by_id("navbarDarkDropdownMenuLink").click()
driver.find_element_by_xpath("//a[@href='/results/']").click()
time.sleep(2)

if("http://127.0.0.1:8000/" ==driver.current_url):
    print("no error")

print('============================================')
print('TEST CASE PASSED')
print('============================================')

driver.close()