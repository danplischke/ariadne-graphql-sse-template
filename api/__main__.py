import os

import uvicorn

directory = os.path.dirname(os.path.realpath(__file__))
if __name__ == '__main__':
    uvicorn.run(
        f"{os.path.basename(directory)}.dev:app",
        host='127.0.0.1',
        port=8000,
        reload=True,
        reload_dirs=[directory],
    )
