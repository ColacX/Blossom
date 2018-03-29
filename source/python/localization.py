# https://towardsdatascience.com/object-detection-with-neural-networks-a4e2c46b4491

from keras.models import Sequential
from keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout
from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
from keras.optimizers import SGD, RMSprop
import numpy
import os

model = Sequential()
model.add(Dense(200, input_dim=64, activation='relu'))
model.add(Dropout(0.2))
model.add(Dense(4))
model.compile('adadelta', 'mse')
