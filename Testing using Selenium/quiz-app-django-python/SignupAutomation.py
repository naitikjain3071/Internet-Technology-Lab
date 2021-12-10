from logging import error
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import time

def signup():
    # Sign Up Credentials
    firstname = "sangeeta1"
    lastname = "jain1"
    email = "sangeetajain123@gmail.com"
    username = "sang123"
    password = "sang12345@"

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
    if("http://127.0.0.1:8000/signup" == driver.current_url):
        print('============================================')
        print('TEST CASE PASSED FOR SIGNUP CHECK')
        print('============================================')
    else:
        print('============================================')
        print('TEST CASE FAILED FOR SIGNUP CHECK')
        print('============================================')
    driver.close()

if __name__ == "__main__":
    signup()