from logging import error
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
import time 

def admin_adds_questions():
    # Login credentials
    username = "admin"
    password = "admin"

    # Details of Question
    question_text ="Which property is used to create space between the element’s border and inner content?"

    # initialize the Chrome driver
    #driver = webdriver.Chrome("/Users/yashvimehta/Downloads/chromedriver")
    driver = webdriver.Chrome("./chromedriver")

    # Page URL
    driver.get("http://127.0.0.1:8000/login")

    driver.find_element_by_id("username").send_keys(username)
    driver.find_element_by_id("password").send_keys(password)
    driver.find_element_by_id("submit").click()
    driver.find_element_by_id("navbarDarkDropdownMenuLink").click()
    driver.find_element_by_xpath("//a[@href='/add_question/']").click()

    driver.find_element_by_id("id_content").send_keys(question_text)
    driver.find_element_by_id("navbarDarkDropdownMenuLink").click()
    select = Select(driver.find_element_by_id('id_quiz'))
    # select by visible text
    select.select_by_visible_text('Distributed Computing')
    # select by value 
    select.select_by_value('15')
    driver.find_element_by_class_name("btn").click()
    #time.sleep(1)
    driver.find_element_by_class_name("btn").click()
    driver.find_element_by_xpath("//a[@href='/add_options/95/']").click()
    driver.find_element_by_id("id_answer_set-0-content").send_keys("border")
    driver.find_element_by_id("id_answer_set-1-content").send_keys("padding")
    driver.find_element_by_id("id_answer_set-1-correct").click()
    driver.find_element_by_id("id_answer_set-2-content").send_keys("spacing")
    driver.find_element_by_id("id_answer_set-3-content").send_keys("margin")
    if("http://127.0.0.1:8000/add_options/95/" ==driver.current_url):
        print('============================================')
        print('TEST CASE PASSED')
        print('============================================')
    else:
        print('============================================')
        print('TEST CASE FAILED')
        print('============================================')
    driver.find_element_by_class_name("btn").click()
    # time.sleep(3)
    driver.close()

if __name__ == "__main__":
    admin_adds_questions()