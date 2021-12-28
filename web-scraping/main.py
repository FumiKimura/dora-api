from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import os
from dotenv import load_dotenv
load_dotenv()

DRIVER_PATH = os.environ.get("DRIVER_PATH")
print(DRIVER_PATH)

options = Options()
options.headless = True
options.add_argument("--window-size=1920, 1200")

driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)
driver.get("https://doraemon.fandom.com/wiki/Category:Gadgets")
all_titles = driver.find_elements_by_class_name("category-page__member-link")

for title in all_titles:
    print(title.text)

driver.quit()
