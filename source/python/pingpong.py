# https://keras.io/#getting-started-30-seconds-to-keras

from keras.models import Sequential
from keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout
from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img, apply_transform
from keras.optimizers import SGD, RMSprop
import numpy
import os
import PIL
from PIL import Image

# https://www.tensorflow.org/api_docs/python/tf/keras/preprocessing/image/load_img
def loadImage( name ):
  dirname = os.path.dirname(__file__)
  filename = dirname + '/data/pingpong/' + name
  pilImage = load_img(filename)
  scale = 4
  pilImage = pilImage.resize( (round(640/scale), round(480/scale) ), PIL.Image.ANTIALIAS)
  data = img_to_array(pilImage)
  return data

# normalized feature input data
X = [
  loadImage('pingpong0.jpeg') / 255,
  loadImage('pingpong1.jpeg') / 255,
  loadImage('pingpong2.jpeg') / 255,
  loadImage('pingpong3.jpeg') / 255,
  loadImage('pingpong4.jpeg') / 255,
  loadImage('pingpong5.jpeg') / 255
]


# normalized output data
Y = [
  [1, 0, 0],
  [1, 0, 0],
  [0, 1, 1],
  [0, 1, 0],
  [0, 0, 1],
  [0, 0, 1]
]

X = numpy.array(X)
Y = numpy.array(Y)
inputShape = X[0].shape
outputShape = len(Y[0])
batchSize = len(X)
model = Sequential()

# https://www.learnopencv.com/image-classification-using-convolutional-neural-networks-in-keras/
model.add(Conv2D(filters = 64, kernel_size = (3, 3), activation='relu', input_shape=inputShape))
model.add(MaxPooling2D(pool_size = (2, 2)))
model.add(Conv2D(filters = 64, kernel_size = (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size = (2, 2)))
model.add(Flatten())
model.add(Dense(units = 128, activation='relu'))
model.add(Dense(units = outputShape, activation = 'softmax'))
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

print('training...')
model.fit(x=X, y=Y, epochs=30, batch_size=batchSize, verbose=1)

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
print('predict', model.predict(X).round(3))
