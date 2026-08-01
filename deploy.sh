#!/bin/bash
set -e

echo "=== Deploy to Kubernetes ==="
echo ""

echo "[1/5] Creating namespace..."
kubectl apply -f k8s/namespace.yaml

echo "[2/5] Creating secrets..."
kubectl apply -f k8s/secret.yaml

echo "[3/5] Deploying application..."
kubectl apply -f k8s/deployment.yaml

echo "[4/5] Creating service..."
kubectl apply -f k8s/service.yaml

echo "[5/5] Creating ingress..."
kubectl apply -f k8s/ingress.yaml

echo ""
echo "=== Deployment Complete ==="
kubectl get pods -n portfolio
