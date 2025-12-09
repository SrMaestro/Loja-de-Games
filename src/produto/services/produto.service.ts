import { Delete, HttpCode, HttpException, HttpStatus, Injectable, Param, ParseIntPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class ProdutoService {
   constructor(
      @InjectRepository(Produto)
      private produtoRepository: Repository<Produto>
   ) { }

   async findAll(): Promise<Produto[]> {
      return await this.produtoRepository.find();
   }

   async findById(id: number): Promise<Produto> {

      const produto = await this.produtoRepository.findOne({
         where: {
            id
         }
      })

      if (!produto)
         throw new HttpException('Produto nao encontrado', HttpStatus.NOT_FOUND)

      return produto
   }

   async findAllByTitulo(titulo: string): Promise<Produto[]> {
      return await this.produtoRepository.find({
         where: {
            titulo: ILike(`%${titulo}%`)
         }
      })
   }

   async create(produto: Produto): Promise<Produto> {
      return await this.produtoRepository.save(produto);
   }

   async update(produto: Produto): Promise<Produto> {

      await this.findById(produto.id)

      return await this.produtoRepository.save(produto);
   }

  async delete(id : number) : Promise<DeleteResult>{
      await this.findById(id)
      
      return await this.produtoRepository.delete(id);
    }


}