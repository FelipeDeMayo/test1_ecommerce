// src/pages/AdminProductsPage.tsx - VERSÃO FINAL

import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import {
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../services/productService'; 

import {
  Container,
  Title,
  Form,
  Input,
  Button,
  ProductsList,
  ProductCard,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  ProductImage,
  Actions,
  ActionButton,
} from '../styles/AdminProductPage';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }
    const priceForApi = form.price.replace(',', '.');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', priceForApi);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      
      setForm({ name: '', description: '', price: '' });
      setImageFile(null);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      alert('Falha ao salvar produto. Verifique o console.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      alert('Falha ao deletar produto. Verifique o console.');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
    });
    setImageFile(null);
  };

  return (
    <Container>
      <Title>Painel de Produtos (Admin)</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          required
        />
        <Input
          name="price"
          type="text"
          inputMode="decimal" 
          placeholder="Preço (ex: 1045,55)"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: '1rem' }}
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Button type="submit">
            {editingProduct ? 'Atualizar Produto' : 'Criar Produto'}
          </Button>
          {editingProduct && (
            <Button
              cancel 
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setForm({ name: '', description: '', price: '' });
                setImageFile(null);
              }}
            >
              Cancelar Edição
            </Button>
          )}
        </div>
      </Form>

      <ProductsList>
        {products.map((product) => (
          <ProductCard key={product.id}>
            {product.image && (
              <ProductImage
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.name}
              />
            )}
            <div>
              <ProductTitle>
                {product.name}{' '}
              <ProductPrice>
                {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </ProductPrice>
              </ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
            </div>
            <Actions>
              <ActionButton onClick={() => handleEdit(product)}>Editar</ActionButton>
              <ActionButton onClick={() => handleDelete(product.id)}>Excluir</ActionButton>
            </Actions>
          </ProductCard>
        ))}
      </ProductsList>
    </Container>
  );
};

export default AdminProductsPage;