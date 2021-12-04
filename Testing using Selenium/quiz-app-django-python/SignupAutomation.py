from logging import error
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import time

# Sign Up Credentials
firstname = "chinmay"
lastname = "jain"
email = "chinmaycj7@gmail.com"
username = "ch123"
password = "abcdefgh123"

# Initialise the Chrome driver
#driver = webdriver.Chrome("/Users/yashvimehta/Downloads/chromedriver")
driver = webdriver.Chrome("./chromedriver")

# Page URL
driver.get("http://127.0.0.1:8000/signup")

driver.find_element_by_id("first_name").send_keys(firstname)
driver.find_element_by_id("last_name").send_keys(lastname)
driver.find_element_by_id("username").send_keys(username)
driver.find_element_by_id("email").send_keys(email)
driver.execute_script("window.scrollTo(0, 1500)")
time.sleep(2)
driver.find_element_by_id("password1").send_keys(password)
driver.find_element_by_id("password2").send_keys(password)
time.sleep(2)
driver.find_element_by_id("submit").click()
time.sleep(2)
print(driver.current_url)
if("http://127.0.0.1:8000/" ==driver.current_url):
    print("no error")

print('============================================')
print('TEST CASE PASSED')
print('============================================')

driver.close()