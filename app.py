from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

# -------------------------------
# Load Model & Dataset
# -------------------------------

pipe = pickle.load(open("pipe.pkl", "rb"))
df = pickle.load(open("df.pkl", "rb"))

# -------------------------------
# Home Page
# -------------------------------

@app.route("/")
def home():

    return render_template(
        "index.html",

        company=sorted(df["Company"].unique()),

        type=sorted(df["TypeName"].unique()),

        cpu=sorted(df["Cpu brand"].unique()),

        gpu=sorted(df["Gpu brand"].unique()),

        os=sorted(df["os"].unique())
    )


# -------------------------------
# Prediction Route
# -------------------------------

@app.route("/predict", methods=["POST"])
def predict():

    try:

        company = request.form["company"]
        type_name = request.form["type"]

        ram = int(request.form["ram"])
        weight = float(request.form["weight"])

        touchscreen = request.form["touchscreen"]
        ips = request.form["ips"]

        screen_size = float(request.form["screen_size"])
        resolution = request.form["resolution"]

        cpu = request.form["cpu"]

        hdd = int(request.form["hdd"])
        ssd = int(request.form["ssd"])

        gpu = request.form["gpu"]
        os = request.form["os"]

        # -------------------------
        # Convert Yes/No
        # -------------------------

        touchscreen = 1 if touchscreen == "Yes" else 0
        ips = 1 if ips == "Yes" else 0

        # -------------------------
        # Calculate PPI
        # -------------------------

        x_res = int(resolution.split("x")[0])
        y_res = int(resolution.split("x")[1])

        ppi = ((x_res**2 + y_res**2) ** 0.5) / screen_size

        # -------------------------
        # Prediction
        # -------------------------

        query = np.array([
            company,
            type_name,
            ram,
            weight,
            touchscreen,
            ips,
            ppi,
            cpu,
            hdd,
            ssd,
            gpu,
            os
        ]).reshape(1, 12)

        prediction = int(np.exp(pipe.predict(query)[0]))

        # -------------------------
        # Result Page
        # -------------------------

        return render_template(

            "result.html",

            price=f"{prediction:,}",

            company=company,

            type=type_name,

            ram=ram,

            weight=weight,

            cpu=cpu,

            gpu=gpu,

            os=os,

            ssd=ssd,

            hdd=hdd,

            screen_size=screen_size
        )

    except Exception as e:

        return render_template(
            "error.html",
            error=str(e)
        )


# -------------------------------
# Run App
# -------------------------------

if __name__ == "__main__":
    app.run(debug=True)
