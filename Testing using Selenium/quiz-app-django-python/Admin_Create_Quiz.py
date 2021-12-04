from logging import error
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait

# Login credentials
username = "admin"
password = "admin"

# Details for Creating Quiz
name_of_quiz = "Internet Technology"
desc_quiz = "Quiz related to Website Development"
no_of_questions = 3
time_of_quiz = 20

# initialize the Chrome driver
#driver = webdriver.Chrome("/Users/yashvimehta/Downloads/chromedriver")
driver = webdriver.Chrome("./chromedriver")

# Page URL
driver.get("http://127.0.0.1:8000/login")

driver.find_element_by_id("username").send_keys(username)
driver.find_element_by_id("password").send_keys(password)
driver.find_element_by_id("submit").click()
driver.find_element_by_id("navbarDarkDropdownMenuLink").click()
driver.find_element_by_xpath("//a[@href='/add_quiz/']").click()

driver.find_element_by_id("id_name").send_keys(name_of_quiz)
driver.find_element_by_id("id_desc").send_keys(desc_quiz)
driver.find_element_by_id("id_number_of_questions").send_keys(Keys.CONTROL + "a")
driver.find_element_by_id("id_number_of_questions").send_keys("3")
driver.find_element_by_id("id_time").send_keys(Keys.CONTROL + "a")
driver.find_element_by_id("id_time").send_keys("20")
driver.find_element_by_class_name("btn").click()

if("http://127.0.0.1:8000/" ==driver.current_url):
    print("no error")

print('============================================')
print('TEST CASE PASSED')
print('============================================')

driver.close()