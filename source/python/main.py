# https://keras.io/#getting-started-30-seconds-to-keras

from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Flatten
from keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
import numpy

# https://stackoverflow.com/questions/43233169/keras-error-expected-dense-input-1-to-have-3-dimensions

X = [
  [[.99, 0.99], [.99, 0.99], [.99, 0.99]], 
  [[.99, 0.99], [.99, 0.99],[.99, 0.99]]
]
Y = [
  [[.01, 0.01], [.01, 0.01], [.01, 0.01]],
  [[.01, 0.01], [.01, 0.01], [.01, 0.01]]
]
X = numpy.array(X)
Y = numpy.array(Y)

print("X", X)
print(X.shape)
print("Y", Y)
print(Y.shape)

batchSize = 2

model = Sequential()
model.add(Dense(2, input_shape=(3, 2)))
model.add(Dense(2))
model.add(Dense(2))
model.compile(optimizer='sgd', loss='mean_squared_error', metrics=['accuracy'])
model.fit(x=X, y=Y, epochs=1000, batch_size=batchSize, verbose=0)

# model.summary()

print(model.evaluate(X, Y))

print(model.predict(X))
