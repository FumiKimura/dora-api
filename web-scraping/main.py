from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import os
from dotenv import load_dotenv
load_dotenv()

DRIVER_PATH = os.environ.get("DRIVER_PATH")
STARTING_URL = "https://doraemon.fandom.com/wiki/Category:Gadgets"
options = Options()
options.headless = True
options.add_argument("--window-size=1920, 1200")
driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)


def getGadgetList(URL):
    while True:
        driver.get(URL)
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        gadgetList = soup.find_all(
            'a', attrs={'class': 'category-page__member-link'})

        for gadget in gadgetList:
            detailPageURL = "https://doraemon.fandom.com" + \
                gadget.get('href')

            saveDetailPage(detailPageURL)

        nextButton = soup.find('a', attrs={
            'class': 'category-page__pagination-next wds-button wds-is-secondary'})

        if nextButton is None:
            print("Finished")
            break

        URL = nextButton.get('href')


def saveDetailPage(URL):
    time.sleep(5)
    driver.get(URL)
    filename = URL.split("/")[-1]
    print(filename)
    save_path = "./raw-data"
    completePath = os.path.join(save_path, f"{filename}.html")
    directory = open(completePath, "w")
    directory.write(driver.page_source)
    directory.close()
    driver.back()


def getDetailPageInfo(URL):
    time.sleep(3)
    driver.get(URL)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    name = soup.find(attrs={'id': 'firstHeading'}).text.strip()
    driver.back()


getGadgetList(STARTING_URL)
driver.quit()
