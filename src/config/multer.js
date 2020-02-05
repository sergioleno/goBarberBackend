import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
// ext name: retorna extensão do arquivo
// resolve: percorre um path

export default {
  // como o multer guarda os arquivos
  // content delivery network, etc
  // amazon s3, digital ocean spaces, etc
  // diskstorage pra salvamento local
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      //funcao que garante nome único p/cada arquivo
      //adicionando um codigo unico antes do nome de cada imagem
      //cb-->callback-->função que precisa ser executada com o nome do arquivo ou com o erro
      //req--> requisição do express
      //file--> todos os dados do arquivo enviado pelo usuario (tamanho,tipo, formato,nome,etc...)
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        //null pq o primeiro parâmetro recebido pelo callback é o erro,e aqui não temos erro
        //res--> resposta do randomBytes convertida numa string hexadecimal
        //extname..tira o nome original do arquivo (que pode conter caracteres especiais)
        //e retorna somente a extenção
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
