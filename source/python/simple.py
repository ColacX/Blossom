# https://keras.io/#getting-started-30-seconds-to-keras

from keras.models import Sequential
from keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout
from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
from keras.optimizers import SGD, RMSprop
import numpy
import os

X = [
  [0.1, 0.1, 0.1],
  [0.5, 0.5, 0.5],
  [0.9, 0.9, 0.9]
]
Y = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]
X = numpy.array(X)
Y = numpy.array(Y)

inputShape = X[0].shape
outputShape = len(Y[0])
batchSize = len(X)
model = Sequential()

# https://www.learnopencv.com/image-classification-using-convolutional-neural-networks-in-keras/
model.add(Dense(units = 3, activation = 'softmax', input_shape = inputShape))
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

model.fit(x=X, y=Y, epochs=100, batch_size=batchSize, verbose=1)

model.summary()
#print('X', X)
print('X.shape', X.shape)
#print('Y', Y)
print('Y.shape', Y.shape)
print('inputShape', inputShape)
print('outputShape', outputShape)
print('batchSize', batchSize)
print('evaluate', model.evaluate(X, Y))
print('predict', model.predict(X))
