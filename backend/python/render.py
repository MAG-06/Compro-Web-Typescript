import sys
import json
import io
from functools import lru_cache
from PIL import Image, ImageDraw, ImageFont

from templates.blanco_config import TEMPLATE_CONFIG as BLANCO_CONFIG
from templates.negro_config import TEMPLATE_CONFIG as NEGRO_CONFIG


TEMPLATES = {
    "blanco": BLANCO_CONFIG,
    "negro": NEGRO_CONFIG,
}


@lru_cache(maxsize=10)
def cargar_imagen(ruta_imagen):
    with open(ruta_imagen, "rb") as img_file:
        return Image.open(io.BytesIO(img_file.read()))


@lru_cache(maxsize=50)
def cargar_fuente(ruta_fuente, tamano):
    return ImageFont.truetype(ruta_fuente, tamano)


def obtener_config(data):
    template_name = data.get("template", "blanco")

    if template_name not in TEMPLATES:
        raise Exception(f"Plantilla no válida: {template_name}")

    return TEMPLATES[template_name]


def generar_comprobante(data):
    config = obtener_config(data)

    imagen = cargar_imagen(config["imagen"]).copy()
    draw = ImageDraw.Draw(imagen)

    color = config.get("color_texto", "#292728")

    nombre = data["nombre"]
    monto = data["monto"]
    numero_cuenta = data["numeroCuenta"]
    numero_tu_cuenta = data["numeroTuCuenta"]
    fecha = data["fecha"]
    referencia = data["referencia"]

    fuente_nombre = cargar_fuente(*config["fuentes"]["nombre"])
    fuente_monto = cargar_fuente(*config["fuentes"]["monto"])
    fuente_cuenta_destino = cargar_fuente(*config["fuentes"]["cuenta_destino"])
    fuente_cuenta_origen = cargar_fuente(*config["fuentes"]["cuenta_origen"])
    fuente_fecha = cargar_fuente(*config["fuentes"]["fecha"])
    fuente_referencia = cargar_fuente(*config["fuentes"]["referencia"])

    # Fuente usada para medir igual que en tu Python original
    fuente_medida = cargar_fuente(*config["fuentes"]["medida"])

    draw.text(
        config["posiciones"]["nombre"],
        nombre,
        font=fuente_nombre,
        fill=color
    )

    draw.text(
        config["posiciones"]["monto"],
        monto,
        font=fuente_monto,
        fill=color
    )

    draw.text(
        config["posiciones"]["cuenta_destino"],
        numero_cuenta,
        font=fuente_cuenta_destino,
        fill=color
    )

    bbox_numero_cuenta = draw.textbbox(
        (0, 0),
        numero_cuenta,
        font=fuente_medida
    )
    ancho_numero_cuenta = bbox_numero_cuenta[2] - bbox_numero_cuenta[0]

    x_final_numero_tu_cuenta = (
        imagen.width - config["margenes"]["cuenta_origen"]
    )
    x_inicio_numero_tu_cuenta = (
        x_final_numero_tu_cuenta - ancho_numero_cuenta
    )

    draw.text(
        (
            x_inicio_numero_tu_cuenta,
            config["posiciones"]["cuenta_origen_y"]
        ),
        numero_tu_cuenta,
        font=fuente_cuenta_origen,
        fill=color
    )

    bbox_fecha = draw.textbbox(
        (0, 0),
        fecha,
        font=fuente_medida
    )
    ancho_fecha = bbox_fecha[2] - bbox_fecha[0]

    x_final_fecha = imagen.width - config["margenes"]["fecha"]
    x_inicio_fecha = x_final_fecha - ancho_fecha

    draw.text(
        (
            x_inicio_fecha,
            config["posiciones"]["fecha_y"]
        ),
        fecha,
        font=fuente_fecha,
        fill=color
    )

    draw.text(
        config["posiciones"]["referencia"],
        referencia,
        font=fuente_referencia,
        fill=color
    )

    salida = io.BytesIO()
    imagen.save(salida, format="PNG")
    return salida.getvalue()


if __name__ == "__main__":
    try:
        raw_data = sys.stdin.read()
        data = json.loads(raw_data)

        imagen_bytes = generar_comprobante(data)

        sys.stdout.buffer.write(imagen_bytes)
        sys.stdout.flush()

    except Exception as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)