<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asset extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company',
        'code',
        'serial_number',
        'brand',
        'description',
        'processor_type',
        'processor_description',
        'ram_type',
        'ram_capacity',
        'storage_type',
        'storage_capacity',
        'vga_card',
        'os_type',
        'os_edition',
        'os_architecture',
        'os_licence',
        'office_licence',
        'ip',
        'purchase_date',
        'warranty_expiry_date',
        'price',
        'status',
        'note',
        'category_id',
        'supplier_id',
    ];

    /**
     * Get the category that owns the Asset
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the supplier that owns the Asset
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get all of the assetTransaction for the Asset
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function assetTransaction(): HasMany
    {
        return $this->hasMany(AssetTransaction::class);
    }
}
