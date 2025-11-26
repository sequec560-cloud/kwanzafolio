import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getSimulationInsight = async (
  amount: number,
  years: number,
  rate: number,
  type: string
): Promise<string> => {
  if (!apiKey) {
    return "Chave de API não configurada. Não é possível gerar insights de IA.";
  }

  try {
    const prompt = `
      Atue como um consultor financeiro sênior.
      O utilizador está a simular um investimento com os seguintes parâmetros:
      - Valor Inicial: ${amount} Kz
      - Tempo: ${years} anos
      - Taxa de Retorno Anual Estimada: ${rate}%
      - Tipo de investimento focado: ${type}

      Forneça uma análise breve (máximo 3 frases) sobre este cenário. 
      Mencione riscos potenciais e se a taxa parece realista para o tipo de ativo.
      Responda em Português de Portugal.
      Mantenha um tom profissional, elegante e direto.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar uma análise no momento.";
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    return "Erro ao conectar com o consultor virtual.";
  }
};