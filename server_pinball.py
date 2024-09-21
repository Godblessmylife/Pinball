from quart import Quart, send_file, render_template

app = Quart(__name__)

# Обслуживание статических файлов
@app.route('/pinball/css/<path:filename>')
async def serve_css(filename):
    return await send_file(f'css/{filename}', mimetype='text/css')

@app.route('/pinball/js/<path:filename>')
async def serve_js(filename):
    return await send_file(f'js/{filename}', mimetype='text/javascript')


@app.route('/pinball/sprites/<path:filename>')
async def serve_sprites(filename):
    return await send_file(f'sprites/{filename}', mimetype='image/jpeg')

@app.route('/pinball/sounds/<path:filename>')
async def serve_sounds(filename):
    return await send_file(f'sounds/{filename}', mimetype='audio/mpeg')



@app.route('/pinball/favicon.ico')
async def serve_fav():
    return await send_file(f'favicon.ico')

@app.route('/pinball/sprites/pinball_elements/<path:filename>')
async def serve_pinball_elements(filename):
    return await send_file(f'sprites/pinball_elements/{filename}', mimetype='image/jpeg')


# Маршрут для корневой страницы
@app.route('/pinball/')
async def index():
    return await render_template('index.html')

if __name__ == '__main__':
    app.run()




