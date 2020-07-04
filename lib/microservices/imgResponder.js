const cote = require('cote');
const Jimp = require('jimp');

const responder = new cote.Responder({ name: 'thumbnail' });

async function imgResize(photo) {
    try {
        const newPhoto = Jimp.read(`../../public/img/${photo}`)
        await newPhoto
            .resize(100, 100)
            .write(`../../public/img/new/thumb-${photo}`)
    }
    catch((err) => {
      console.error(err);
    });
};

responder.on('thumbnail', async (req, done) => {

    console.log(`Creating new img: ${req.photo}`);
    await imgResize(req.photo)
    done()
}
