const Hapi = require('@hapi/hapi');
const { nanoid } = require('nanoid');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  server.route({
    method: 'POST',
    path: '/books',
    handler: (request, h) => {
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      } = request.payload;

      // Validasi data buku
      if (!name || typeof name !== 'string') {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
      }

      if (!year || typeof year !== 'number') {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi tahun buku dengan angka',
        }).code(400);
      }

      if (!author || typeof author !== 'string') {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi penulis buku',
        }).code(400);
      }

      if (!summary || typeof summary !== 'string') {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi ringkasan buku',
        }).code(400);
      }

      if (!publisher || typeof publisher !== 'string') {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi penerbit buku',
        }).code(400);
      }

      if (!pageCount || typeof pageCount !== 'number') {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi jumlah halaman buku dengan angka',
        }).code(400);
      }

      if (!readPage || typeof readPage !== 'number') {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi halaman yang sudah dibaca dengan angka',
        }).code(400);
      }

      if (readPage > pageCount) {
        return h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
      }

      const id = nanoid(16);
      const finished = pageCount === readPage;
      const insertedAt = new Date().toISOString();

      const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt: insertedAt,
      };

      // Simpan buku ke dalam database (dalam hal ini, array books)
      books.push(newBook);

      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId: id },
      }).code(201);
    },
  });

  await server.start();
  console.log('Server running on', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

// Database sederhana untuk menyimpan buku
const books = [];

init();
