import numpy as np
import pandas as pd
x = pd.Series([1,2,3,4,5,6,7,8,9,10])
print([i**2 for i in x])
     

# import gspread

# sa = gspread.service_account(filename="service_account.json")
# sh = sa.open("Jackson_Grocery_Inv")

# wks = sh.worksheet("data")

# print('Rows: ', wks.row_count)
# print('Cols: ', wks.col_count)
# #print(wks.acell('A3').value)
# #print(wks.cell(3, 4).value)
# #print(wks.get('A3:C6'))

# print(wks.get_all_records())


# print('Hello World')