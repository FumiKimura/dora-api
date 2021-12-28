from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from bs4 import BeautifulSoup
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
        try:
            driver.get(URL)
            print(URL)
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            gadgetList = soup.find_all(
                'a', attrs={'class': 'category-page__member-link'})

            for gadget in gadgetList:
                detailPageURL = "https://doraemon.fandom.com" + \
                    gadget.get('href')

                # getDetailPageInfo(detailPageURL)

            nextButton = soup.find('a', attrs={
                'class': 'category-page__pagination-next wds-button wds-is-secondary'})
            URL = nextButton.get('href')
        except Exception as e:
            print('Finished')
            break


def getDetailPageInfo(URL):
    driver.get(URL)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    name = soup.find(attrs={'id': 'firstHeading'}).text.strip()
    print(name)
    driver.back()


getGadgetList(STARTING_URL)
driver.quit()
