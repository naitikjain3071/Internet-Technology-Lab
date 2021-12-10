from logging import error
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import time

def login():
    # Login credentials
    username = "n123"
    password = "n123"

    # initialize the Chrome driver
    #driver = webdriver.Chrome("/Users/yashvimehta/Downloads/chromedriver")
    driver = webdriver.Chrome("./chromedriver")

    # Page URL
    driver.get("http://127.0.0.1:8000/login")

    driver.find_element_by_id("username").send_keys(username)
    driver.find_element_by_id("password").send_keys(password)
    driver.find_element_by_id("submit").click()
    time.sleep(3)

    if("http://127.0.0.1:8000/" ==driver.current_url):
        print('============================================')
        print('TEST CASE PASSED FOR LOGIN CHECK')
        print('============================================')
    else:
        print('============================================')
        print('TEST CASE FAILED FOR LOGIN CHECK')
        print('============================================')

    driver.close()

if __name__ == "__main__":
    login()