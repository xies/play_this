#!/usr/bin/python

from flask import Flask
from flask import render_template
from flask import make_response
from flask import url_for

from xspfparser import parse

# initiate flask
app = Flask(__name__)

# determine relative path based on local WGSI or deployment
if __name__ == '__main__':
	rel_path = ''
else:
	rel_path = '/home/xies/mysite/'
xmlname = rel_path + 'static/data.xml'

def loadPlaylist(xmlname):
    # parse XML file with XSPF standard
	playlist = parse(xmlname).playlist

	# change some xspf fieldnames to displayable names
	xspf2disp = {
		'identifier':'Track',
		'creator':'Artist',
		'date':'Year',
		'mood':'Mood',
		'label':'Label',
		'title':'Title',
		'album':'Album',
		'image':'Art',
		'location':'location',
		'annotation':'Notes'
		}

	for track in playlist.track:
		for key,val in track.iteritems():
			track.pop(key)
			track[ xspf2disp.get(key) ] = val;

	dispKeys = ['Track','Title','Artist','Album','Year','Label','Mood']

	return playlist, dispKeys

@app.route('/')
def index():
	playlist, dispKeys = loadPlaylist(xmlname)
	# index page / home
	return render_template('playlist.html',playlist=playlist,dispKeys=dispKeys)

@app.route('/track_<trackID>/')
def track(trackID):
	playlist, _ = loadPlaylist(xmlname)
	track = next((t for t in playlist.track if t['Track'] == trackID),None)
	return render_template('track.html', track=track,trackID=trackID)

@app.errorhandler(404)
def not_found(error):
	resp = make_response(render_template('error.html'), 404)
	return resp

### Debug environment
if __name__ == '__main__':
	app.debug = True
	app.run()
	# Render some URL for static content
	url_for('static', filename='./static/audio/1.ogg')
	url_for('static', filename='./static/audio/2.ogg')
	url_for('static', filename='./static/audio/3.ogg')
	url_for('static', filename='./static/audio/4.ogg')
	url_for('static', filename='./static/audio/5.ogg')
