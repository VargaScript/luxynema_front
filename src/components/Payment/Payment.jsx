import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            try {
                // Enviar el resultado al backend para procesar el pago
                const response = await fetch('http://127.0.0.1:8000/public/buy_ticket/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer USER_TOKEN`, //El token va despues del bearer y un espacio
                    },
                    body: JSON.stringify({ paymentMethod: result.paymentMethod }),
                });

                if (!response.ok) {
                    throw new Error('Error al procesar el pago');
                }

                // Manejar el éxito del pago
                console.log('Pago procesado exitosamente');
            } catch (error) {
                setError('Error al procesar el pago. Por favor, intenta de nuevo.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-xl font-semibold mb-4">Detalles de Pago</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <CardElement className="border border-gray-300 p-2 rounded w-full" />
                </div>
                <button
                    type="submit"
                    disabled={!stripe}
                    className="bg-green-500 text-white py-2 px-4 rounded w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Pagar
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
        </div>
    );
};
