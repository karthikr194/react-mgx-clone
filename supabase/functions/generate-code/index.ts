import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    console.log('Received prompt:', prompt);

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
    if (!DEEPSEEK_API_KEY) {
      console.error('DEEPSEEK_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Calling DeepSeek API...');
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: `You are an expert React developer. Generate complete, production-ready React components with TypeScript.
            
IMPORTANT RULES:
1. Generate ONLY valid React + TypeScript code
2. Use functional components with hooks
3. Include all necessary imports (React, useState, useEffect, etc.)
4. Use Tailwind CSS for styling
5. Make the code self-contained and immediately executable
6. Add proper TypeScript types
7. Include helpful comments
8. Return ONLY the code, no explanations or markdown

Example format:
import React, { useState } from 'react';

const MyComponent = () => {
  // component logic
  return (
    <div className="p-4">
      {/* JSX */}
    </div>
  );
};

export default MyComponent;`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to generate code',
          details: errorText 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('DeepSeek API response received');
    
    const generatedCode = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        code: generatedCode,
        model: 'deepseek-coder'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-code function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
