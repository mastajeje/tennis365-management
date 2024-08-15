from selenium import webdriver
from selenium.webdriver.common.by import By

# chrome_driver_path = "/usr/local/bin/chromedriver"
options = webdriver.ChromeOptions()
options.add_experimental_option('detach', True)

driver = webdriver.Chrome( options=options)


driver.get("https://goyangtennis.or.kr/bbs/login.php?&url=https%3A%2F%2Fgoyangtennis.or.kr%2Fbbs%2Fboard.php%3Fbo_table%3Dtennis_reservation")

loginBtn = driver.find_element(By.CLASS_NAME, "btn-e")

driver.find_element(By.NAME,'mb_id').send_keys("kjzon")
driver.find_element(By.NAME,'mb_password').send_keys("xpsltm365")


loginBtn.click()
# className = driver.find_element(By.CLASS_NAME, "ContentHeaderView-module__tab___uYoNi")

# print(className.text)
# driver.close()