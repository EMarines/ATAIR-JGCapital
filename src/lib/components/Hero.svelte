<script lang="ts">
    import "../../styles/main.css"
    import logo from '/favicon.svg'
</script>

<div class="hero">
    <div class="container">
        <div class="header cabezal">
            <div class="logo">
                <img src="/favicon.svg" alt="JGCapital">
            </div>
            <div class="marca">
                <h1 class="title">JGCapital</h1>
                <h5 class="slogan">¡Seguridad Confianza en Bienes Raíces!</h5>
            </div>

        </div>
    </div>
</div>

<style>
    .hero {
        position: relative; /* Para establecer un contexto de posicionamiento */
        padding-top: 10px; /* Espacio arriba */
        padding-bottom: 0px; /* Espacio abajo */
        min-height: 100px; /* Altura mínima para el hero */
        background-color: var(--primary-color);
    }

    .title {
        color: antiquewhite;
    }


    img {
        width: 350px; /* Mucho más ancho */
        max-height: none; /* Sin restricción de altura */
        position: absolute; /* Sacarlo del flujo normal */
        left: -10px; /* Ajustar posición */
        top: 80%; /* Centrar verticalmente */
        transform: translateY(-50%) scale(1.5); /* Centrar y escalar */
        z-index: 2; /* Por encima de otros elementos */
    }

    .header {
        display: flex;
        padding: 10px;
    }

    .marca {
        margin-left: auto; /* Empuja a la derecha */
        padding-left: 20px; /* Espacio del logo */
        z-index: 1;
    }

    .logo {
        position: relative;
        overflow: visible;
        min-height: 80px; /* Espacio reservado */
    }

    h5.slogan {
        margin-top: 0.5rem;
        color: rgba(250, 235, 215, 0.9); /* Un poco más legible que el blanco puro */
    }
    
    .cabezal {
        justify-content: space-between;
    }

    @media (max-width: 800px) {
        img {
            position: static; /* Volver al flujo normal en móviles */
            transform: scale(1.3); /* Escala menor en móviles */
            width: 280px;
        }
        .hero {
            margin: 0 .3em;
        }
        .header {
            display: flex; /* Corregido: 'felx' a 'flex' */
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .title {
            font-size: 2.5rem;
        }
        h5 {
            font-size: 1.2rem;
        }
    }

    @media (max-width: 500px) {
        .title {
            display: none;
        }
        h5.slogan {
            font-size: 0.9rem;
        }
        img {
            width: 180px; /* Ajuste para móviles pequeños */
            padding: 0;
            margin: 0;
        }
}

</style>