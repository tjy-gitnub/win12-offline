from flask import Flask,redirect,send_file
from werkzeug.routing import BaseConverter

 
app = Flask(__name__)

@app.route("/")
def index():
    return redirect('/desktop/')

@app.route("/desktop/")
def desktop():
    return open('file/desktop.html',encoding='utf8').read()

@app.route("/desktop/<path:u>")
def desk_f(u):
    return send_file('file/'+u)

@app.route("/setdata/<k>/<v>")
def setdata(k,v):
    return '>_-)o'

@app.route("/getdata")
def getdata():
    return {
        'theme': 'light',
        'color1': '#ad6eca',
        'color2': '#3b91d8'
        }

if __name__ == "__main__":
    app.run()