# https://keras.io/#getting-started-30-seconds-to-keras
from keras.models import Sequential, load_model
from keras.layers import Dense, Flatten, Conv2D, MaxPooling2D, Dropout
from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
from keras.optimizers import SGD, RMSprop
import keras.utils
import numpy
import os
import sys
import json
from datetime import datetime

modelPath = './data/classygrid/classify.h5'

# https://stackoverflow.com/questions/43233169/keras-error-expected-dense-input-1-to-have-3-dimensions
def loadImage( filename ):
  # normalized
  data = img_to_array(load_img(filename)) / 255
  return data

def train():
  start = datetime.now()
  X = []
  Y = []

  for root, directories, filenames in os.walk('./data/classygrid/class'):
    for filename in filenames: 
      X.append(os.path.join(root, filename))
      Y.append(root)

  # normalized category data
  y, Y = numpy.unique(Y, return_inverse=True)
  Y = keras.utils.to_categorical(Y)

  # normalized feature input data
  X = list(map(loadImage, X))

  X = numpy.array(X)
  Y = numpy.array(Y)

  inputShape = X[0].shape
  outputShape = len(Y[0])
  batchSize = len(X)

  model = Sequential()

  # https://www.learnopencv.com/image-classification-using-convolutional-neural-networks-in-keras/

  # https://www.quora.com/What-is-max-pooling-in-convolutional-neural-networks
  # max pooling downsamples the image(w,h) but also picks the max value in the grid

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

  model.fit(x=X, y=Y, epochs=20, batch_size=batchSize, verbose=1)
  model.save(modelPath)

  #model.summary()
  #print('X', X)
  print('X.shape', X.shape)
  #print('Y', Y)
  print('Y.shape', Y.shape)
  print('inputShape', inputShape)
  print('outputShape', outputShape)
  print('batchSize', batchSize)
  #print('evaluate', model.evaluate(X, Y))
  #print('predict', model.predict(X))
  print('predict', model.predict(X).round(3))
  end = datetime.now()
  print(str(end - start))

def predict(p):
  model = load_model(modelPath)
  X = [loadImage(p)]
  X = numpy.array(X)
  print(json.loads(json.dumps(model.predict(X).tolist())))
  sys.stdout.flush()
  sys.stderr.flush()

if len(sys.argv) > 1:
  predict(sys.argv[1])
else:
  train()
