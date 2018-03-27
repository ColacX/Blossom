# https://keras.io/#getting-started-30-seconds-to-keras

from keras.models import Sequential
from keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout
from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
import numpy
import os


# https://stackoverflow.com/questions/43233169/keras-error-expected-dense-input-1-to-have-3-dimensions

def loadImage( name ):
  dirname = os.path.dirname(__file__)
  filename = dirname + '/data/' + name
  data = img_to_array(load_img(filename))
  return data

X = [
  loadImage('canvas1.png'), 
  loadImage('canvas2.png'),
  loadImage('canvas3.png')
]
Y = [
  [0.99, 0.01, 0.01],
  [0.01, 0.99, 0.01],
  [0.01, 0.01, 0.99]
]
X = numpy.array(X)
Y = numpy.array(Y)

#print("X", X)
print('X', X.shape)
#print("Y", Y)
print('Y', Y.shape)

model = Sequential()

model.add(Conv2D(32, (3, 3), activation='relu', input_shape=X[0].shape))
model.add(Conv2D(32, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(3, activation='softmax'))
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

model.fit(x=X, y=Y, epochs=100, batch_size=len(X), verbose=1)

# model.summary()
print('evaluate', model.evaluate(X, Y))
print('predict', model.predict(X))
